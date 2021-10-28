import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { DEEP_LINKS, STORIES } from './../../../../../constants/routes';
import { BC_DEEP_LINKS_ADD, BC_DEEP_LINKS_EDIT, BC_STORIES_EDIT, BC_STORY_ADD } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pagination } from '../../../../../constants/paginator';
import { LIMIT } from '../../../../../constants/validator';
import { INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, DEEP_LINK_ERROR_MESSAGES } from '../../../../../constants/messages';
import { DeeplinksService } from '../../_services/deeplinks.service';

@Component({
  selector: 'lv-add-edit-deeplinks',
  templateUrl: './add-edit-deeplinks.component.html',
  styleUrls: ['./add-edit-deeplinks.component.scss'],
  providers: [DeeplinksService]
})
export class AddEditDeeplinksComponent extends Pagination implements OnInit {

  public deeplinkForm: FormGroup;
  public deepLinkId: string;
  public deeplinkDetails: Deeplink.DeeplinkData;
  public _limit = LIMIT;
  public errMsg = { ...DEEP_LINK_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _deeplink: DeeplinksService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.deepLinkId = this._actRoute.snapshot.params['deepLinkId'];
    this.createForm();

    if (this.deepLinkId) {
      this._bc.setBreadcrumb(BC_DEEP_LINKS_EDIT);
      if (this._common.isValidId(this.deepLinkId)) {
        this.getDeeplinkDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_DEEP_LINKS_ADD);
    }
  }

  createForm() {
    this.deeplinkForm = this._fb.group({
      name: [''],
      url: [''],
    })
  }

  get f() { return this.deeplinkForm.controls } //return form controls

  public getDeeplinkDetails() {
    this.isApiCallInProgress = true;
    this._deeplink.getDeeplinkDetail({ deepLinkId: this.deepLinkId}).subscribe((res: Deeplink.DeeplinkDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.deeplinkDetails = res.data;
        this.deeplinkForm.patchValue(this.deeplinkDetails);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  public async deeplinkHandler() {

    if (this.deepLinkId && !this.deeplinkDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('deep-link'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.deeplinkForm.valid) {

      let formValue = this.deeplinkForm.value;

      if (this.deepLinkId) {
        if (this.deeplinkForm.dirty) {
          this.updateStory(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewDeeplink(formValue);
      }

    }
  }

  private addNewDeeplink(formBody: any): void {
    this._deeplink.addDeeplink(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateStory(formBody: any): void {
    formBody['deepLinkId'] = this.deepLinkId;
    this._deeplink.updateDeeplink(formBody).subscribe(res => {
      if (res.statusCode === 200) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.deeplinkForm.value) {
      if (this.deeplinkForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

  public cancelHandler(): void {
    this._loc.back();
  }

  private navigate(mssg?: string):void {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([DEEP_LINKS]);
  }
}
