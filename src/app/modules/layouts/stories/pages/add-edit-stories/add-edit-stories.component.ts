import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { STORIES } from './../../../../../constants/routes';
import { BC_STORIES_EDIT, BC_STORY_ADD } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { Pagination } from '../../../../../constants/paginator';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { LIMIT } from '../../../../../constants/validator';
import { timeWithDateMs } from '../../../../../constants/helper';
import { INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, TIME_ERROR, 
   STORY_ACCESS_TYPE, STORY_LINK_ACCESS, STORY_ERROR_MESSAGES, STORY_DISPALY_DURATION, DEEPLINK_TYPES, STORY_LINK_ACCESS_TYPE } from '../../../../../constants/messages';
import { StoriesService } from '../../_services/stories.service';


@Component({
  selector: 'lv-add-edit-stories',
  templateUrl: './add-edit-stories.component.html',
  styleUrls: ['./add-edit-stories.component.scss'],
  providers: [StoriesService, S3BucketService]

})
export class AddEditStoriesComponent extends Pagination implements OnInit {

  public storyForm: FormGroup;
  public storyId: string;
  public storyDetails: Story.StoryData;
  public storyAccessType = STORY_ACCESS_TYPE;
  public storyDisplayDuration = STORY_DISPALY_DURATION;
  public linkAccessTypes = STORY_LINK_ACCESS_TYPE;
  public linkAccess = STORY_LINK_ACCESS;
  public todayStory = new Date();
  public cropFile: any;
  public _limit = LIMIT;
  public errMsg = { ...STORY_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  public isApiCallInProgress: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _stories: StoriesService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    super();
    this.todayStory.setDate(this.todayStory.getDate());
    this.today.setDate(this.today.getDate());
  }

  ngOnInit() {
    this.storyId = this._actRoute.snapshot.params['storyId'];
    this.createForm();

    if (this.storyId) {
      this._bc.setBreadcrumb(BC_STORIES_EDIT);
      if (this._common.isValidId(this.storyId)) {
        this.getStoryDetails();
      }
    } else {
      this.setDateTime();
      this._bc.setBreadcrumb(BC_STORY_ADD);
    }
  }

  createForm() {
    this.storyForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      image: [''],
      startDate: [],
      expiryDate: [],
      startTime: [],
      expiryTime: [],
      displayDurationTime: [],
      accessType: [''],
      linkAccessType: [''],
      accessLink: ['']
    })
  }

  get f() { return this.storyForm.controls } //return form controls

  setDateTime() {
    this.f.startDate.setValue(this.todayStory);
    this.f.startTime.setValue(new Date(this.today));
    // this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
  }

  getStoryDetails() {
    this.isApiCallInProgress = true;
    this._stories.getStoryDetail({ storyId: this.storyId}).subscribe((res: Story.StoryDetail) => {
      this.isApiCallInProgress = false;
      if (res.statusCode == 200) {
        this.storyDetails = res.data;
        this.cropFile = {
          cropBase64: this.storyDetails.image,
          cropFile: this.storyDetails.image
        }
        
        this.storyForm.patchValue(this.storyDetails);
        this.f.image.setValue(this.storyDetails.image);

        if (this.storyId) {
          this.f.startDate.setValue(new Date(this.storyDetails.startDate));
          this.f.expiryDate.setValue(new Date(this.storyDetails.expiryDate));
          this.f.startTime.setValue(new Date(this.storyDetails.startDate));
          this.f.expiryTime.setValue(new Date(this.storyDetails.expiryDate));
        } 
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
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  storyStartDateChange() {
    this.f.expiryDate.setValue(null);
    this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
  }

  storyStartTimeChange(event?: any) {
    this.f.expiryime.setValue(null);
  }

  public async storyHandler() {

    if (this.storyId && !this.storyDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('story'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.storyForm.valid) {

      let formValue = this.storyForm.value;

      /**
       * @FORCE_FULLY I'm doing this but not Intentionally
       */
      formValue.startDate = timeWithDateMs(formValue.startTime, formValue.startDate);
      formValue.expiryDate = timeWithDateMs(formValue.expiryTime, formValue.expiryDate);
      delete formValue.startTime;
      delete formValue.expiryTime;

      if (formValue.startDate >= formValue.expiryDate) {
        this._toast.error(TIME_ERROR.GREATER_TIME);
        return
      }

      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }

      if (this.storyId) {
        if (this.storyForm.dirty) {
          this.updateStory(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewStory(formValue);
      }

    }
  }

  public uploadImage(formValue) {
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

  private addNewStory(formBody: any): void {
    this._stories.addStory(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  private updateStory(formBody: any): void {
    formBody['storyId'] = this.storyId;
    this._stories.updateStory(formBody).subscribe(res => {
      if (res.statusCode === 200) {
        this.navigate(res.message);
      }
    })
  }

  private checkValidation(): void {

    for (const key in this.storyForm.value) {
      if (this.storyForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.f.startDate.value) {
      this.f.startDate.setErrors({ required: true });
    }

    if (!this.f.expiryDate.value) {
      this.f.expiryDate.setErrors({ required: true });
    }

    if (!this.f.startTime.value) {
      this.f.startTime.setErrors({ required: true });
    }

    if (!this.f.expiryTime.value) {
      this.f.expiryTime.setErrors({ required: true });
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
      return
    }

    if (!this.f.startDate.valid) {
      this.f.startDate.setErrors({ 'invalid': true });
      return
    }

    if (!this.f.expiryDate.valid) {
      this.f.expiryDate.setErrors({ 'invalid': true });
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
    this._router.navigate([STORIES]);
  }
}
