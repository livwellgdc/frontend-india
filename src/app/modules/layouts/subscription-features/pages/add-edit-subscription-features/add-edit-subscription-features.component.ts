import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { DEEP_LINKS, SUBSCRIPTION_FETURES } from './../../../../../constants/routes';
import { BC_SUBSCRIPTION_FEATURE_ADD, BC_SUBSCRIPTION_FEATURE_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LIMIT } from '../../../../../constants/validator';
import { INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, DEEP_LINK_ERROR_MESSAGES, SUBSCRIPTION_FEATURES, SUBSCRIPTION_FEATURE_ERROR_MESSAGES, SUBSCRIPTION_PLANS } from '../../../../../constants/messages';
import { SubscriptionFeatureService } from '../../_services/subscription-feature.service';

@Component({
  selector: 'lv-add-edit-subscription-features',
  templateUrl: './add-edit-subscription-features.component.html',
  styleUrls: ['./add-edit-subscription-features.component.scss'],
  providers: [SubscriptionFeatureService]

})
export class AddEditSubscriptionFeaturesComponent implements OnInit {

  public subscriptionFeatureForm: FormGroup;
  public subscriptionFeatureId: string;
  public subscriptionFeatureDetails: SubscriptionFeature.SubscriptionFeatureData;
  public _limit = LIMIT;
  public errMsg = { ...SUBSCRIPTION_FEATURE_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;
  public subscriptionFeaturesList = SUBSCRIPTION_FEATURES;
  public subscriptionPlans = SUBSCRIPTION_PLANS;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _subscriptionService: SubscriptionFeatureService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subscriptionFeatureId = this._actRoute.snapshot.params['subscriptionFeatureId'];
    this.createForm();

    if (this.subscriptionFeatureId) {
      this._bc.setBreadcrumb(BC_SUBSCRIPTION_FEATURE_EDIT);
      if (this._common.isValidId(this.subscriptionFeatureId)) {
        this.getSubscriptionFeatureDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_SUBSCRIPTION_FEATURE_ADD);
    }
  }
  createForm() {
    this.subscriptionFeatureForm = this._fb.group({
      feature: [''],
      featureConfig: this._fb.array([...this.createConfigForm()])
    })
  }

  private getFeatureForm() {
    return this._fb.group({
      subscriptionPlanType: [''],
      value: [''],
      display: [''],
      description: [''],
    })
  }

  private createConfigForm() {
    const featuresList = [];
    for (let i = 0; i < 2; i++) {
      featuresList.push(this._fb.group({
        subscriptionPlanType: [''],
        value: [''],
        display: [''],
        description: [''],
      }))
    }
    return featuresList;
  }
  get f() { return this.subscriptionFeatureForm.controls } //return form controls

  public getFeatureConfigControls() {
    return this.subscriptionFeatureForm.get('featureConfig') as FormArray;
  }

  public getSubscriptionFeatureDetails() {
    this.isApiCallInProgress = true;
    this._subscriptionService.getFeatureDetail({ subscriptionFeatureId: this.subscriptionFeatureId }).subscribe((res: SubscriptionFeature.SubscriptionFeatureDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.subscriptionFeatureDetails = res.data;
        this.subscriptionFeatureForm.patchValue(this.subscriptionFeatureDetails);
        // this.subscriptionFeatureDetails.featureConfig.forEach((eachItem, index) => {
        //   if (index > 0) {
        //     let featureConfigCtl = this.getFeatureConfigControls();
        //     let newFeatureConfigOfferCtl = this.getFeatureForm();
        //     newFeatureConfigOfferCtl.patchValue(eachItem);
        //     featureConfigCtl.push(newFeatureConfigOfferCtl);
        //   }
        // })
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  public async subscriptionFeatureHandler() {

    if (this.subscriptionFeatureId && !this.subscriptionFeatureDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('deep-link'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.subscriptionFeatureForm.valid) {

      let formValue = this.subscriptionFeatureForm.value;

      if (this.subscriptionFeatureId) {
        if (this.subscriptionFeatureForm.dirty) {
          this.updateSubscriptionFeature(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewDeeplink(formValue);
      }

    }
  }

  private addNewDeeplink(formBody: any): void {
    this._subscriptionService.addFeature(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateSubscriptionFeature(formBody: any): void {
    formBody['subscriptionFeatureId'] = this.subscriptionFeatureId;
    this._subscriptionService.updateFeatures(formBody).subscribe(res => {
      if (res.statusCode === 200) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.subscriptionFeatureForm.value) {
      if (this.subscriptionFeatureForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([SUBSCRIPTION_FETURES]);
  }

}
