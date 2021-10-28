import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { UploadPopupComponent } from 'src/app/components/cropper/upload-popup/upload-popup.component';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { BC_CHARITY_ADD, BC_CHARITY_EDIT } from 'src/app/constants/breadcrumb-routes';
import { Location } from '@angular/common';
import { CHARITY_ERROR_MESSAGES, DATA_NOT_FOUND, INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { CHARITY } from 'src/app/constants/routes';
import { LIMIT, REGEX } from 'src/app/constants/validator';
import { CommonService } from 'src/app/services/common/common.service';
import { S3BucketService } from 'src/app/services/s3-bucket/s3-bucket.service';
import { CharityService } from '../../_services/charity.service';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';

@Component({
  selector: 'lv-add-edit-charity',
  templateUrl: './add-edit-charity.component.html',
  styleUrls: ['./add-edit-charity.component.scss'],
  providers: [CharityService, S3BucketService]
})
export class AddEditCharityComponent extends Pagination implements OnInit {

  public charityForm: FormGroup;
  public charityId: string;
  public charityDetails: Charity.CharityData;
  public cropFile: any;
  public _limit = LIMIT;
  public errMsg = { ...CHARITY_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _charity: CharityService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.charityId = this._actRoute.snapshot.params['charityId'];
    this.createForm();

    if (this.charityId) {
      this._bc.setBreadcrumb(BC_CHARITY_EDIT);
      if (this._common.isValidId(this.charityId)) {
        this.getCharityDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_CHARITY_ADD);
    }
  }

  createForm() {
    this.charityForm = this._fb.group({
      name: [''],
      logo: [''],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      mobileNo: ['', [Validators.pattern(REGEX.AMOUNT)]],
      websiteLink: [''],
      location: this._fb.group({
        address: [''],
        coordinates: ['']
      }),
      address: [''],
      coordinates: [''],
      description: this._fb.group({
        en: [''],
        vi: ['']
      })
    })
  }

  get f() { return this.charityForm.controls } //return form controls

  openGoogleMap() {
    const dialogRef = this._dialog.open(GoogleMapComponent, {
      width: "400px",
      data: { data: this.charityForm.value }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.lat) {
          delete result.lat;
        }
        if (result.long) {
          delete result.long;
        }
        if (result.parentData) {
          this.f.location.patchValue(result);
          this.f.address.setValue(result.address);
          this.f.coordinates.setValue(result.coordinates);
          this.f.address.markAsDirty();
        } else {
          this._toast.error(DATA_NOT_FOUND);
        }
      }
    });
  }

  getCharityDetails() {
    this.isApiCallInProgress = true;
    this._charity.getCharityDetail({ charityId: this.charityId}).subscribe((res: Charity.CharityDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.charityDetails = res.data;
        this.cropFile = {
          cropBase64: this.charityDetails.logo,
          cropFile: this.charityDetails.logo
        }
        
        this.charityForm.patchValue(this.charityDetails);
        if (this.charityDetails.location && this.charityDetails.location.address) {
          this.f.address.setValue(this.charityDetails.location.address);
          this.f.coordinates.setValue(this.charityDetails.location.coordinates);
        }
        this.f.logo.setValue(this.charityDetails.logo);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  trimValues() {
    for (const key in this.charityForm.value) {
      if (this.charityForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 7.5, inputWidth: 400, type: 'CHARITY' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.logo.setErrors(null);
        this.f.logo.markAsDirty();
      }
    });
  }

  public async charityHandler() {

    if (this.charityId && !this.charityDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('charity'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.charityForm.valid) {

      let formValue = this.charityForm.value;

      if (this.cropFile && this.f.logo.dirty) {
        await this.uploadImage(formValue);
      }
      if (this.charityId) {
        if (this.charityForm.dirty) {
          this.updateCharity(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewCharity(formValue);
      }

    }
  }

  public uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.logo = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private addNewCharity(formBody: any): void {
    delete formBody.address;
    delete formBody.coordinates;
    this._charity.addCharity(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateCharity(formBody: any): void {
    delete formBody.address;
    delete formBody.coordinates;
    formBody['charityId'] = this.charityId;
    this._charity.updateCharity(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      } else {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.charityForm.value) {
      if (this.charityForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.logo.setErrors({ 'logo': true });
      return
    }
  }

  public cancelHandler(): void {
    this._loc.back();
  }

  private navigate(mssg?: string):void {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([CHARITY]);
  }

}
