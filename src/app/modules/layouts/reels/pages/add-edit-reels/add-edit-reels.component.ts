import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { REELS } from './../../../../../constants/routes';
import { BC_REELS_ADD, BC_REELS_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { LIMIT } from '../../../../../constants/validator';
import {
  INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, TIME_ERROR,
  STORY_ACCESS_TYPE, REELS_ERROR_MESSAGES
} from '../../../../../constants/messages';
import { ReelsService } from '../../_services/reels.service';
import { LazyVideoComponent } from 'src/app/components/lazy-video/lazy-video.component';

@Component({
  selector: 'lv-add-edit-reels',
  templateUrl: './add-edit-reels.component.html',
  styleUrls: ['./add-edit-reels.component.scss'],
  providers: [ReelsService, S3BucketService]
})
export class AddEditReelsComponent implements OnInit {

  public reelsForm: FormGroup;
  public reelsId: string;
  public reelsDetails: Reels.ReelsData;
  public storyAccessType = STORY_ACCESS_TYPE;
  public cropFile: any;
  public _limit = LIMIT;
  public errMsg = { ...REELS_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;
  private videoFile: any;
  public fileName: string;
  public videoUrl: any;
  public videoSizeError: any;
  public defaultImg = './assets/images/image_uploader.png';
  @ViewChild(LazyVideoComponent, { static: true }) lazyVideoComponent: LazyVideoComponent;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _reels: ReelsService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.reelsId = this._actRoute.snapshot.params['reelsId'];
    this.createForm();

    if (this.reelsId) {
      this._bc.setBreadcrumb(BC_REELS_EDIT);
      if (this._common.isValidId(this.reelsId)) {
        this.getReelsDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_REELS_ADD);
    }
  }

  createForm() {
    this.reelsForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      thumbnail: [''],
      video: [""],
    })
  }

  getFileDetails(file) {
    if (!file) {
      return;
    }
    this.videoFile = file;
    this.fileName = file.name;

    if(this.videoFile) {
      this.f.video.setErrors(null);
      this.f.video.markAsDirty();
    }
  }

  get f() { return this.reelsForm.controls } //return form controls

  private getReelsDetails() {
    this.isApiCallInProgress = true;
    this._reels.getReelsDetail({ reelsId: this.reelsId }).subscribe((res: Reels.ReelsDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.reelsDetails = res.data;
        this.lazyVideoComponent.urls = [this.reelsDetails.video];
        this.cropFile = {
          cropBase64: this.reelsDetails.thumbnail,
          cropFile: this.reelsDetails.thumbnail
        }
        this.reelsForm.patchValue(this.reelsDetails);
        this.f.thumbnail.setValue(this.reelsDetails.thumbnail);
      }
    }, () => {
      this.isApiCallInProgress = false;
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1080px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 4 / 7.1, inputWidth: 1080, type: 'STORIES' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.thumbnail.setErrors(null);
        this.f.thumbnail.markAsDirty();
      }
    });
  }

  public async reelsHandler() {

    if (this.reelsId && !this.reelsDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('reels'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.reelsForm.valid) {

      let formValue = this.reelsForm.value;

      if (this.cropFile && this.f.thumbnail.dirty) {
        await this.uploadImage(formValue);
      }

      if(this.videoFile && this.f.video.dirty) {
        await this.uploadVideo(formValue);
      }

      if (this.reelsId) {
        if (this.reelsForm.dirty) {
          this.updateReels(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewReels(formValue);
      }

    } else {
      this._toast.error("Plese fill required fields");
    }
  }

  public uploadImage(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          formValue.thumbnail = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  public uploadVideo(formValue) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.videoFile).then((response: any) => {
        console.log(location)
        console.log(response.Location)
        if (response && response.Location) {

          formValue.video = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private addNewReels(formBody: any): void {
    this._reels.addReels(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateReels(formBody: any): void {
    formBody['reelsId'] = this.reelsId;
    this._reels.updateReels(formBody).subscribe(res => {
      if (res.statusCode === 200) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.reelsForm.value) {
      if (this.reelsForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.thumbnail.setErrors({ 'thumbnail': true });
    }
    if (!this.videoFile) {
      this.f.video.setErrors({ 'video': true });
    }

  }

  public cancelHandler(): void {
    this._loc.back();
  }

  private navigate(mssg?: string): void {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([REELS]);
  }

}
