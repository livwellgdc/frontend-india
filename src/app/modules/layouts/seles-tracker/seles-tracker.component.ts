import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { BC_SELES_TRACKER, BC_SELES_TRACKER_LIST } from 'src/app/constants/breadcrumb-routes';
import { autoGenerateCode, removeDuplicates, splitAt } from 'src/app/constants/helper';
import { COUPON_CODE_TYPE, INVALID_DATE_TIME_ERROR, REWARD_ERROR_MESSAGES, SECTION_ID_OF, SELECT_VALID_FILE, SELES_TRACKER_ERROR_MESSAGES, SOMETHING_WRONG, STORY_ERROR_MESSAGES, VALID_CSV_FILE_HEADER, VALID_CSV_FILE_SIZE } from 'src/app/constants/messages';
import { LIMIT, REGEX } from 'src/app/constants/validator';
import { CommonService } from 'src/app/services/common/common.service';
import { AssignedCodesListComponent } from './pages/assigned-codes-list/assigned-codes-list.component';
import { SelesTrackerService } from './_services/seles-tracker.service';

@Component({
  selector: 'lv-seles-tracker',
  templateUrl: './seles-tracker.component.html',
  styleUrls: ['./seles-tracker.component.scss'],
  providers: [SelesTrackerService]
})
export class SelesTrackerComponent implements OnInit {

  @ViewChild(AssignedCodesListComponent, { static: false }) assignedCodesListComponent: AssignedCodesListComponent;
  public couponForm: FormGroup;
  public assignReferralForm: FormGroup;
  public readonly codeType = COUPON_CODE_TYPE;
  public readonly _limit = LIMIT;
  public permissionClass: string = '';

  errMsg = { ...SELES_TRACKER_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  codesArray = {
    autoGeneratedCodes: [],
    fileName: ''
  }
  @ViewChild('csvReader', null) csvReader: ElementRef;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _toast: ToastService,
    private _seles_tracker: SelesTrackerService) { }

  ngOnInit() {
    this.createForm();
    this.createAssignForm();
    this._bc.setBreadcrumb(BC_SELES_TRACKER);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.REFERRAL);
  }

  private createForm(): void {
    this.couponForm = this._fb.group({
      totalRedemption: [, [Validators.pattern(REGEX.AMOUNT)]],
      couponCodeType: [this.codeType[0].value],
    })
  }

  private createAssignForm(): void {
    this.assignReferralForm = this._fb.group({
      data: this._fb.array([
        this._fb.group({
          referreName: ['', [Validators.required]],
          referralCode: ['', [Validators.required]],
          lwcCredit: ['', [Validators.required]],
          limit: ['', [Validators.required]]
        })
      ])

    })
  }

  get data() {
    return this.assignReferralForm.get("data") as FormArray;
  }

  get f() { return this.couponForm.controls } // return form controls
  get f2() { return this.assignReferralForm.controls } // return form controls

  

  public onChangeCodeType(value: string) {
    // if (this.rewardId && this.rewardDetails.isDisabled) {
    //   this.f.couponCodeType.setValue(this.rewardDetails.couponCodeType);
    // } else {
    if (value == this.codeType[0].value) {
      this.f.totalRedemption.setErrors({ required: true });
      // this.resetSelectedFile();
    } else {
      this.f.totalRedemption.setErrors(null);
    }
    this.f.totalRedemption.setValue('');
    this.f.totalRedemption.updateValueAndValidity();
  }
  // }

  downloadSampleCsv() {
    this._common.downloadInCsvFormat(['ABCD1234'], ['Code'], true, 'sample_code');
  }

  public autoGenerateCouponCode() {
    if (this.f.couponCodeType.value == this.codeType[0].value && this.f.totalRedemption.value) {
      let couponCode = "LVWL";
      const currentdate = new Date();

      let hours = currentdate.getHours();
      if(hours > 9 ) {
        const h = hours % 3;
        couponCode = couponCode + h;
      } else {
        couponCode = couponCode + hours;
      }
      
      const seconds = currentdate.getSeconds();
      if(seconds > 9 ) {
        const s = seconds % 7;
        couponCode = couponCode + s;
      } else {
        couponCode = couponCode + seconds;
      }

      let minutes = currentdate.getMinutes()
      if(minutes > 9 ) {
        const m = hours % 7;
        couponCode = couponCode + m;
      } else {
        couponCode = couponCode + minutes;
      }

      const month = currentdate.getMonth();
      if(month > 9 ) {
        const m = month % 3;
        couponCode = couponCode + m;
      } else {
        couponCode = couponCode + month;
      }
      
      this.codesArray.autoGeneratedCodes = autoGenerateCode(couponCode, this.f.totalRedemption.value);
    }
  }

  private resetSelectedFile() {
    if (this.csvReader && this.csvReader.nativeElement) {
      this.csvReader.nativeElement.value = "";
    }
    this.codesArray.fileName = '';
    this.codesArray.autoGeneratedCodes = [];
  }

  public fileChange($event: any) {
    
      let files = $event.srcElement.files;
      this.codesArray.fileName = files[0].name;

      if (this._common.isValidCSVFile(files[0])) {

        if (files[0].size > 5000000) {
          this._toast.info(VALID_CSV_FILE_SIZE);
          this.resetSelectedFile();
          return;
        }

        let input = $event.target;
        let reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = () => {
          let csvData = reader.result;
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

          let headersRow = this._common.getHeaderArray(csvRecordsArray);
          if (headersRow[0] !== 'S.No.' || headersRow[1] !== 'Code') {
            this._toast.error(VALID_CSV_FILE_HEADER);
            this.resetSelectedFile();
            return;
          }

          this.codesArray.autoGeneratedCodes = removeDuplicates(this._common.getDataRecordsArrayFromCSVFile(csvRecordsArray));

          if (!this.codesArray.autoGeneratedCodes.length) {
            this._toast.error(this.errMsg.MIN_MANUAL_CODE);
            this.resetSelectedFile();
            return
          }
        };

        reader.onerror = () => {
          this._toast.error(SOMETHING_WRONG);
          this.resetSelectedFile();
        };

      } else {
        this._toast.error(SELECT_VALID_FILE);
        this.resetSelectedFile();
      }
  }

  public assingCodeHandler() {
    console.log(this.assignReferralForm.value)

    if (this.assignReferralForm.valid) {
      this._seles_tracker.assignReferralCode(this.assignReferralForm.value).subscribe(res => {
        if (res.statusCode == 201) {
          this._toast.success(res.message);
          this.assignReferralForm.reset();
          this.assignedCodesListComponent.getAssignedList();
        }
      })
    }

  }
}
