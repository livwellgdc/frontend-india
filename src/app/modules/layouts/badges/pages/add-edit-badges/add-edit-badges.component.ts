import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../_service/badge.service';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../../../services/common/common.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BADGE_ERROR_MESSAGES } from '../../../../../constants/messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BADGES } from '../../../../../constants/routes';
import { BC_BADGES_ADD, BC_BADGES_EDIT } from '../../../../../constants/breadcrumb-routes';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { MatDialog } from '@angular/material';
import { LIMIT } from '../../../../../constants/validator';

@Component({
  selector: 'lv-add-edit-badges',
  templateUrl: './add-edit-badges.component.html',
  styleUrls: ['./add-edit-badges.component.scss'],
  providers: [S3BucketService, BadgeService]
})
export class AddEditBadgesComponent implements OnInit {

  badgeForm: FormGroup;
  badgeId: string;
  badgeDetails: Badge.BadgeData;
  cropFile: any;
  _limit = LIMIT;
  errMsg = BADGE_ERROR_MESSAGES;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _common: CommonService,
    private _toast: ToastService,
    private _badge: BadgeService,
    private _s3: S3BucketService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _loc: Location,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.badgeId = this._actRoute.snapshot.params['badgeId'];
    this.createForm();
    if (this.badgeId) {
      this._bc.setBreadcrumb(BC_BADGES_EDIT);
      if (this._common.isValidId(this.badgeId)) {
        this.getBadgeDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_BADGES_ADD);
    }
  }

  createForm() {
    this.badgeForm = this._fb.group({
      image: [''],
      name: [''],
      points: [0],
      description: this._fb.group({
        en: [''],
        vi: ['']
      })
    })
  }

  get f() { return this.badgeForm.controls } //return form controls

  getBadgeDetails() {
    this._badge.getBadgeDetail({ badgeId: this.badgeId }).subscribe((res: Badge.BadgeDetail) => {
      if (res.statusCode == 200) {
        this.badgeDetails = res.data;
        this.cropFile = {
          cropBase64: this.badgeDetails.image,
          cropFile: this.badgeDetails.image
        }
        this.badgeForm.patchValue(this.badgeDetails);
        this.f.image.setValue(this.badgeDetails.image);
      }
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 5 / 5.0001, inputWidth: 300 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  async badgeHandler() {
    this.checkValidation();
    if (this.badgeForm.valid) {
      let formValue = this.badgeForm.value;
      formValue.points = Number(formValue.points);

      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }
      if (this.badgeId) {
        if (this.badgeForm.dirty) {
          this.updateBadge(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewBadge(formValue);
      }
    }
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

  addNewBadge(formBody: any) {
    this._badge.addBadge(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateBadge(formBody: any) {
    formBody['badgeId'] = this.badgeId;
    this._badge.updateBadge(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    for (const key in this.badgeForm.value) {
      if (this.badgeForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([BADGES]);
  }

}

