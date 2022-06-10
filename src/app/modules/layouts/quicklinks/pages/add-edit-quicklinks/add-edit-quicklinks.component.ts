import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { QUICK_LINKS } from './../../../../../constants/routes';
import { BC_QUICK_LINKS_ADD, BC_QUICK_LINKS_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { LIMIT } from '../../../../../constants/validator';
import { DEEPLINK_URLS, INVALID_DATE_TIME_ERROR, DEEPLINK_TYPES, NO_EDIT_ACTION, QUICK_lINK_ERROR_MESSAGES } from '../../../../../constants/messages';
import { QuicklinksService } from '../../_services/quicklinks.service';
import { Subscription } from 'rxjs';
import { DeeplinksService } from '../../../deeplinks/_services/deeplinks.service';
import { Pagination } from 'src/app/constants/paginator';

@Component({
  selector: 'lv-add-edit-quicklinks',
  templateUrl: './add-edit-quicklinks.component.html',
  styleUrls: ['./add-edit-quicklinks.component.scss'],
  providers: [S3BucketService, QuicklinksService, DeeplinksService]
})
export class
  AddEditQuicklinksComponent extends Pagination implements OnInit {

  public quickLinkForm: FormGroup;
  public quickLinkId: string;
  private quickLinkDetails: QuickLink.QuickLinkData;
  public deepLinkUrls = DEEPLINK_URLS;
  public cropFile: any;
  public _limit = LIMIT;
  public errMsg = { ...QUICK_lINK_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;
  private subscriptions: Subscription[] = [];
  public deepLinkList = [];
  public categoryList = [];
  public deeplinkTypes = DEEPLINK_TYPES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _quickLinks: QuicklinksService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _deepLink: DeeplinksService,
  ) { super() }

  ngOnInit() {
    this.quickLinkId = this._actRoute.snapshot.params['quickLinkId'];
    this.createForm();
    this.getDeeplinkListing();
    this.getCategoryList()
    if (this.quickLinkId) {
      this._bc.setBreadcrumb(BC_QUICK_LINKS_EDIT);
      if (this._common.isValidId(this.quickLinkId)) {
        this.getQuickLinkDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_QUICK_LINKS_ADD);
    }
  }

  createForm() {
    this.quickLinkForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      description: this._fb.group({
        en: [''],
      }),
      icon: [''],
      priority: [''],
      deeplinkType: [''],
      deepLink: [''],
      colorCode: [''],
      categoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
        }),
        image: [''],
        status: [''],
        accessType: [''],
        categoryType: ['']
      }),
    })
  }

  public getDeeplinkListing() {
    let queryObj = {
      pageNo: 1,
      limit: 1000,
    }
    this.subscriptions.push(
      this._deepLink.getDeeplinkList(queryObj).subscribe(response => {
        this.deepLinkList = response.data;
      }, () => {
      })
    );
  }

  get f() { return this.quickLinkForm.controls } //return form controls

  public onDeeplinkTypeChange() {
    this.f.deepLink.reset();
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType:this.API_EVENT.quickLinks,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      this.isApiCallInProgress = false;
      if (res.statusCode === 200) {
        this.categoryList = res.data;
        console.log("======>", this.categoryList);
        // this.categorySelectionHandler(this.challengeDetails.categoryId._id);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  public getQuickLinkDetails() {
    this.isApiCallInProgress = true;
    this._quickLinks.getQuickLinkDetail({ quickLinkId: this.quickLinkId }).subscribe((res: QuickLink.QuickLinkDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.quickLinkDetails = res.data;
        this.cropFile = {
          cropBase64: this.quickLinkDetails.icon,
          cropFile: this.quickLinkDetails.icon
        }

        this.quickLinkForm.patchValue(this.quickLinkDetails);
        this.f.icon.setValue(this.quickLinkDetails.icon);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 5 / 5.0001, inputWidth: 300, type: 'QUICKLINKS' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.icon.setErrors(null);
        this.f.icon.markAsDirty();
      }
    });
  }


  public async quickLinkHandler() {

    if (this.quickLinkId && !this.quickLinkDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('quick-links'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.quickLinkForm.valid) {

      let formValue = this.quickLinkForm.value;

      if (this.cropFile && this.f.icon.dirty) {
        await this.uploadImage(formValue);
      }

      if (this.quickLinkId) {
        if (this.quickLinkForm.dirty) {
          this.updateQuickLink(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewQuickLinks(formValue);
      }

    }
  }

  public uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.icon = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private addNewQuickLinks(formBody: any): void {
    this._quickLinks.addQuickLink(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }
   categorySelectionHandler(categoryId) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (categoryId == this.categoryList[find]._id) {
        this.f.categoryId.patchValue(this.categoryList[find]);
        break;
      }
    }
  }
  private updateQuickLink(formBody: any): void {
    console.log("============>", formBody)
    formBody['quickLinkId'] = this.quickLinkId;
    this._quickLinks.updateQuickLink(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.quickLinkForm.value) {
      if (this.quickLinkForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.icon.setErrors({ 'icon': true });
      return
    }
  }

  public cancelHandler(): void {
    this._loc.back();
  }

  private navigate(mssg?: string): void {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([QUICK_LINKS]);
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
