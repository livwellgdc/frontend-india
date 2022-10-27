import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { REGEX, LIMIT } from '../../../../../constants/validator';
import { ActivatedRoute, Router } from '@angular/router';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { BannerService } from '../../_service/banner.service';
import { BC_BANNERS_EDIT, BC_BANNERS_ADD } from '../../../../../constants/breadcrumb-routes';
import { BANNER_ERROR_MESSAGES, BANNER_TYPES, DEEPLINK_TYPES } from '../../../../../constants/messages';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { BANNERS } from '../../../../../constants/routes';

@Component({
  selector: 'lv-add-edit-banners',
  templateUrl: './add-edit-banners.component.html',
  styleUrls: ['./add-edit-banners.component.scss'],
  providers: [S3BucketService, BannerService]
})
export class AddEditBannersComponent implements OnInit {
  bannerForm: FormGroup;
  bannerId: string;
  bannerDetails: Banner.BannerData;
  cropFile: any;
  _limit = LIMIT;
  errMsg = BANNER_ERROR_MESSAGES;
  public bannersTypes = BANNER_TYPES;
  public deeplinkTypes = DEEPLINK_TYPES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _banner: BannerService,
    private _actRoute: ActivatedRoute,
    private _s3: S3BucketService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.bannerId = this._actRoute.snapshot.params['bannerId'];
    this.createForm();
    if (this.bannerId) {
      this._bc.setBreadcrumb(BC_BANNERS_EDIT);
      if (this._common.isValidId(this.bannerId)) {
        this.getBannerDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_BANNERS_ADD);
    }
  }

  createForm() {
    this.bannerForm = this._fb.group({
      image: [''],
      title: [''],
      type: [''],
      bannerLink: [''],
      linkType:[]
    })
  }

  get f() { return this.bannerForm.controls } //return form controls

  getBannerDetails() {
    this._banner.getBannerDetail({ bannerId: this.bannerId }).subscribe((res: Banner.BannerDetail) => {
      if (res.statusCode == 200) {
        this.bannerDetails = res.data;
        if (this.bannerDetails.image) {
          this.cropFile = {
            cropBase64: this.bannerDetails.image,
            cropFile: this.bannerDetails.image
          }
        }
        this.bannerForm.patchValue(this.bannerDetails);
        this.f.image.setValue(this.bannerDetails.image);
      }
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 6.67, inputWidth: 300, type: 'BANNER' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  async bannerHandler() {
    this.checkValidation();
    if (this.bannerForm.valid) {
      let formValue = this.bannerForm.value;
      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }
      if (this.bannerId) {
        if (this.bannerForm.dirty) {
          this.updateBanner(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewBanner(formValue);
      }
    }
  }
  public onDeeplinkTypeChange() {
    this.f.bannerLink.reset();
  }

  uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.image = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  addNewBanner(formBody: any) {
    this._banner.addBanner(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateBanner(formBody: any) {
    formBody['bannerId'] = this.bannerId;
    this._banner.updateBanner(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {
    for (const key in this.bannerForm.value) {
      if (this.bannerForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
      return
    }
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([BANNERS]);
  }



}
