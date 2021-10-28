import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { SPIN_WHEEL } from './../../../../../constants/routes';
import { BC_SPIN_WHEEL_ADD, BC_SPIN_WHEEL_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LIMIT } from '../../../../../constants/validator';
import { INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, HTTP_STATUS_CODE, SPIN_WHEEL_ERROR_MESSAGES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { SpinWheelsService } from '../../_services/spin-wheels.service';

@Component({
  selector: 'lv-add-edit-spin-wheels',
  templateUrl: './add-edit-spin-wheels.component.html',
  styleUrls: ['./add-edit-spin-wheels.component.scss'],
  providers: [SpinWheelsService]
})
export class AddEditSpinWheelsComponent implements OnInit {

  public spinWheelForm: FormGroup;
  public spinnerWheelMetaId: string;
  private spinWheelDetails: SpinWheel.SpinWheelData;
  public _limit = LIMIT;
  public errMsg = { ...SPIN_WHEEL_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _spinWheel: SpinWheelsService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spinnerWheelMetaId = this._actRoute.snapshot.params['spinnerWheelMetaId'];
    this.createForm();
    if (this.spinnerWheelMetaId) {
      this._bc.setBreadcrumb(BC_SPIN_WHEEL_EDIT);
      if (this._common.isValidId(this.spinnerWheelMetaId)) {
        this.getSpinwheelDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_SPIN_WHEEL_ADD);
    }
  }

  createForm() {
    this.spinWheelForm = this._fb.group({
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      value: [''],
      weight: [''],
      title: [''],
    })
  }

  get f() { return this.spinWheelForm.controls } //return form controls

  public getSpinwheelDetails() {
    this.isApiCallInProgress = true;
    this._spinWheel.getSpinWheelDetail({ spinnerWheelMetaId: this.spinnerWheelMetaId }).subscribe((res: SpinWheel.SpinWheelDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.spinWheelDetails = res.data;
        this.spinWheelForm.patchValue(this.spinWheelDetails);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  public async quickLinkHandler() {

    if (this.spinnerWheelMetaId && !this.spinWheelDetails.isEdit) {
      this._toast.error(NO_EDIT_ACTION('spin-wheel'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.spinWheelForm.valid) {

      let formValue = this.spinWheelForm.value;

      if (this.spinnerWheelMetaId) {
        if (this.spinWheelForm.dirty) {
          this.updateSpinwheel(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addSpinWheel(formValue);
      }

    }
  }

  private addSpinWheel(formBody: any): void {
    this._spinWheel.addSpinWheel(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateSpinwheel(formBody: any): void {
    formBody['spinnerWheelMetaId'] = this.spinnerWheelMetaId;
    this._spinWheel.updateSpinWheel(formBody).subscribe(res => {
      if (res.statusCode === HTTP_STATUS_CODE.UPDATED) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.spinWheelForm.value) {
      if (this.spinWheelForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

  public cancelHandler(): void {
    this._loc.back();
  }

  private navigate(mssg?: string): void {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([SPIN_WHEEL]);
  }

  
  /**
   * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
   */
   ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}
