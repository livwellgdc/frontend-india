import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { CHALLENGES } from './../../../../../constants/routes';
import { BC_CHALLENGES_EDIT, BC_CHALLENGES_ADD, BC_CHALLENGES_COPY } from '../../../../../constants/breadcrumb-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { ChallengeService } from '../../_service/challenge.service';
import { Pagination } from '../../../../../constants/paginator';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { timeWithDateMs } from '../../../../../constants/helper';
import { CHALLENGE_ERROR_MESSAGES, INVALID_DATE_TIME_ERROR, NO_EDIT_ACTION, TIME_ERROR, CHALLENGE_TYPE, FREQUENCY, CHALLENGE_ACCESS_TYPE, CHALLENGE_CATEGORY_TYPES, CHALLENGE_CATEGORY_TYPES_OBJECT } from '../../../../../constants/messages';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'lv-add-edit-challenges',
  templateUrl: './add-edit-challenges.component.html',
  styleUrls: ['./add-edit-challenges.component.scss'],
  providers: [ChallengeService, S3BucketService]
})
export class AddEditChallengesComponent extends Pagination implements OnInit {

  challengeForm: FormGroup;
  challengeId: string;
  copyChallengeId: string;
  challengeDetails: Challenge.ChallengeData;
  categoryList = [];
  benefitCategoryList = [];
  classCategoryList = [];
  rewardList = [];
  badgeList = [];
  challengeType = CHALLENGE_TYPE;
  challengeAccessType = CHALLENGE_ACCESS_TYPE;
  frequency = FREQUENCY;
  todayChallenge = new Date();
  cropFile: any;
  _limit = LIMIT;
  errMsg = { ...CHALLENGE_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  isApiCallInProgress = {
    ofCategory: true,
    ofBadge: true
  }
  public seelctedCategoryDetails: any;
  public challengeCategoryTypes = CHALLENGE_CATEGORY_TYPES_OBJECT;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _challenge: ChallengeService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    super();
    if (environment.production) {
      this.todayChallenge.setDate(this.todayChallenge.getDate() + 1);
      this.today.setDate(this.today.getDate() + 1);
    }
  }

  ngOnInit() {




    this.challengeId = this._actRoute.snapshot.params['challengeId'];
    this.copyChallengeId = this._actRoute.snapshot.queryParams['copyChallenge'];
    this.createForm();
    // this.getCategoryList(this.API_EVENT.challenge);
    this.getCategoryList(this.API_EVENT.class);
    this.getCategoryList(this.API_EVENT.livwellBenifit);
    this.getBadgeList();
    if (this.challengeId) {
      this._bc.setBreadcrumb(BC_CHALLENGES_EDIT);
      if (this._common.isValidId(this.challengeId)) {
        this.getChallengeDetails();
      }
    } else if (this.copyChallengeId) {
      this._bc.setBreadcrumb(BC_CHALLENGES_COPY);
      if (this._common.isValidId(this.copyChallengeId)) {
        this.getChallengeDetails();
      } else {
        this.getCategoryList(this.API_EVENT.challenge);
      }
    } else {
      this.getCategoryList(this.API_EVENT.challenge);
      this.setDateTime();
      this._bc.setBreadcrumb(BC_CHALLENGES_ADD);
      this.getCategoryList(this.API_EVENT.challenge);
    }
  }

  createForm() {
    this.challengeForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      image: [''],
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      startDate: [],
      endDate: [],
      startTime: [],
      endTime: [],
      points: [],
      totalWinner: [, [Validators.pattern(REGEX.AMOUNT)]],
      value: [, [Validators.pattern(REGEX.AMOUNT)]],
      type: [''],
      accessType: [''],
      joinedDate: [],
      visibleUpTo: [, [Validators.pattern(REGEX.AMOUNT)]],
      badgeId: this._fb.group({
        _id: [''],
        name: [''],
        image: [''],
        points: [],
        description: this._fb.group({
          en: [''],
          vi: ['']
        })
      }),
      categoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        image: [''],
        status: [''],
        accessType: [''],
        type: ['']
      }),
      benefitsCategoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        image: [''],
        status: ['']
      }),
      rewardId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        image: [''],
        status: ['']
      }),
      classCategoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        image: [''],
        status: ['']
      }),
      sponsorName: [''],
      hasDonations: [false]
    })
  }

  get f() { return this.challengeForm.controls } //return form controls

  setDateTime() {
    if (environment.production) {
      this.f.startDate.setValue(this.todayChallenge);
      this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
    }
  }

  getChallengeDetails() {
    this._challenge.getChallengeDetail({ challengeId: this.challengeId ? this.challengeId : this.copyChallengeId }).subscribe((res: Challenge.ChallengeDetail) => {
      if (res.statusCode == 200) {
        this.challengeDetails = res.data;
        this.getCategoryList(this.API_EVENT.challenge);
        this.cropFile = {
          cropBase64: this.challengeDetails.image,
          cropFile: this.challengeDetails.image
        }
        if (this.challengeDetails.benefitsCategoryId && this.challengeDetails.benefitsCategoryId._id) {
          this.getRewardList(this.challengeDetails.benefitsCategoryId._id);
        }
        this.challengeForm.patchValue(this.challengeDetails);
        this.f.image.setValue(this.challengeDetails.image);

        if (this.challengeDetails.joinedDate) {
          this.f.joinedDate.setValue(new Date(this.challengeDetails.joinedDate));
        }
        if (this.challengeId) {
          this.f.startDate.setValue(new Date(this.challengeDetails.startDate));
          this.f.endDate.setValue(new Date(this.challengeDetails.endDate));
          this.f.startTime.setValue(new Date(this.challengeDetails.startDate));
          this.f.endTime.setValue(new Date(this.challengeDetails.endDate));
        } else {
          this.challengeStartDateChange();
        }
      }
    })
  }

  onSelectFile() {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 10 / 7.5, inputWidth: 400, type: 'CHALLENGE' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cropFile = result;
        this.f.image.setErrors(null);
        this.f.image.markAsDirty();
      }
    });
  }

  challengeStartDateChange() {
    this.f.endDate.setValue(null);
    if (environment.production) {
      this.f.startTime.setValue(new Date(this.today.setHours(0, 0, 0)));
    }
  }

  challengeStartTimeChange(event?: any) {
    this.f.endTime.setValue(null);
  }

  getBadgeList() {
    this._challenge.getBadgesForChallenge().subscribe(res => {
      this.isApiCallInProgress.ofBadge = false;
      if (res.statusCode === 200) {
        this.badgeList = res.data;
      }
    }, () => {
      this.isApiCallInProgress.ofBadge = false;
      this.badgeList = [];
    })
  }

  getCategoryList(categoryType: string) {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: categoryType,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      this.isApiCallInProgress.ofCategory = false;
      if (res.statusCode === 200) {
        if (categoryType === this.API_EVENT.challenge) {
          this.categoryList = res.data;
          if (this.challengeId || this.copyChallengeId) {
            this.categorySelectionHandler(this.challengeDetails.categoryId._id);
          }
        } else if (categoryType === this.API_EVENT.class) {
          this.classCategoryList = res.data;
        } else {
          this.benefitCategoryList = res.data;
        }
      }
    }, () => {
      this.isApiCallInProgress.ofCategory = false;
    })
  }

  categorySelectionHandler(categoryId: string) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (categoryId == this.categoryList[find]._id) {
        this.seelctedCategoryDetails = this.categoryList[find];
        if (this.seelctedCategoryDetails.type == this.challengeCategoryTypes.CHALLENGE) {

          this.challengeForm.addControl('startDate', new FormControl());
          this.challengeForm.addControl('startTime', new FormControl());
          this.challengeForm.addControl('endDate', new FormControl());
          this.challengeForm.addControl('endTime', new FormControl());
          this.challengeForm.addControl('totalWinner', new FormControl());

          //Commented for now
          // this.challengeForm.addControl('frequencyType', new FormControl());
          // if(this.challengeDetails && this.challengeDetails.frequencyType) {
          //   this.f.frequencyType.setValue(this.challengeDetails.frequencyType);
          // }
          this.setDateTime();
        } else if (this.seelctedCategoryDetails.type == this.challengeCategoryTypes.GROUP) {

          this.challengeType = this.challengeType.filter(element => element.value == "STEPS" || element.value == "KILOMETRES")
          this.challengeForm.addControl('startDate', new FormControl());
          this.challengeForm.addControl('startTime', new FormControl());
          this.challengeForm.addControl('endDate', new FormControl());
          this.challengeForm.addControl('endTime', new FormControl());

          this.challengeForm.removeControl('totalWinner');
          // this.challengeForm.removeControl('joinedDate');
          // this.challengeForm.removeControl('visibleUpTo');
          // this.challengeForm.removeControl('badgeId');
          // this.challengeForm.removeControl('points');
          // this.challengeForm.removeControl('benefitsCategoryId');
          // this.challengeForm.removeControl('rewardId');
          console.log("=================================remove controlls======")
          this.setDateTime();
        } else {
          this.challengeForm.addControl('totalWinner', new FormControl());

          this.challengeForm.removeControl('startDate');
          this.challengeForm.removeControl('startTime');
          this.challengeForm.removeControl('endDate');
          this.challengeForm.removeControl('endTime');
          // this.challengeForm.removeControl('frequencyType');/Commented for now
        }

        if (this.seelctedCategoryDetails.hasDonations && this.challengeCategoryTypes.CHALLENGE) {

          this.challengeForm.addControl('entryFee', new FormControl(this.challengeDetails && this.challengeDetails.entryFee ? this.challengeDetails.entryFee : ''));
        } else {
          this.challengeForm.removeControl('entryFee');
        }

        this.f.hasDonations.setValue(this.seelctedCategoryDetails.hasDonations);
        console.log("this.seelctedCategoryDetails==============", this.seelctedCategoryDetails)
        this.f.categoryId.patchValue(this.seelctedCategoryDetails);
        break;
      }
    }
  }


  classCategorySelectionHandler(categoryId: string) {
    if (this.f.type.value === 'CLASS_BOOKING' || this.f.type.value === 'CLASS_COMPLETED') {
      if (categoryId) {
        for (let find = 0; find < this.classCategoryList.length; find++) {
          if (categoryId == this.classCategoryList[find]._id) {
            this.f.classCategoryId.patchValue(this.classCategoryList[find]);
            break;
          }
        }
      }
    } else {
      this.f.classCategoryId.setValue({ _id: '', name: { en: '', vi: '' }, image: '', status: '' });
    }
  }

  badgeSelectionHandler(badgeId: string) {
    for (let find = 0; find < this.badgeList.length; find++) {
      if (badgeId == this.badgeList[find]._id) {
        this.f.badgeId.patchValue(this.badgeList[find]);
        this.setPointsValue();
        break;
      }
    }
  }

  benefitSelectionHandler(categoryId: string) {
    if (categoryId) {
      for (let find = 0; find < this.benefitCategoryList.length; find++) {
        if (categoryId == this.benefitCategoryList[find]._id) {
          this.f.benefitsCategoryId.patchValue(this.benefitCategoryList[find]);
          break;
        }
      }
      this.getRewardList(categoryId);
    }
    this.f.rewardId.setValue({ _id: '', name: { en: '', vi: '' }, image: '', status: '' });
  }

  getRewardList(categoryId: string) {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryId: categoryId
    }
    this.rewardList = [];
    this._common.getRewards(queryObj).subscribe(res => {
      if (res.statusCode === 200) {
        this.rewardList = res.data;
      }
    }, () => {
      this.f.benefitsCategoryId.setValue({ _id: '', name: { en: '', vi: '' }, image: '', status: '' });
    })
  }

  rewardSelectionHandler(rewardId: string) {
    for (let find = 0; find < this.rewardList.length; find++) {
      if (rewardId == this.rewardList[find]._id) {
        this.f.rewardId.patchValue(this.rewardList[find]);
        break;
      }
    }
  }

  challengeTypeSelectionHandler(typeValue: string) {
    this.f.value.setValue('');
    if (typeValue !== 'CLASS_BOOKING' && typeValue !== 'CLASS_COMPLETED') {
      this.f.classCategoryId.setValue({ _id: '', name: { en: '', vi: '' }, image: '', status: '' });
    }
  }

  setPointsValue() {
    this.f.points.setValue(this.f['badgeId']['controls'].points.value);
  }

  onChangeJoinedDate() {
    this.joinedDateAndVisibilityValidations();
  }

  removeJoinedDate() {
    this.f.joinedDate.setValue('');
    this.joinedDateAndVisibilityValidations();
  }

  removeVisibility() {
    this.joinedDateAndVisibilityValidations();
  }

  joinedDateAndVisibilityValidations() {
    this.f.joinedDate.markAsTouched();
    this.f.visibleUpTo.markAsTouched();
    if (this.f.visibleUpTo.value && !this.f.joinedDate.value) {
      this.f.joinedDate.setErrors({ required: true });
    } else if (this.f.joinedDate.value && !this.f.visibleUpTo.value) {
      this.f.visibleUpTo.setErrors({ required: true });
    } else {
      this.f.joinedDate.setErrors(null);
      this.f.joinedDate.updateValueAndValidity();
      this.f.visibleUpTo.setErrors(null);
      this.f.visibleUpTo.updateValueAndValidity();
    }
  }

  async challengeHandler() {
    if (this.challengeId && !this.challengeDetails.isEdited) {
      this._toast.error(NO_EDIT_ACTION('challenge'));
      this.navigate();
      return;
    }

    this.checkValidation();
    if (this.challengeForm.valid) {
      let formValue = this.challengeForm.value;

      formValue.points = Number(formValue.points);
      formValue.value = Number(formValue.value);
      formValue.totalWinner = Number(formValue.totalWinner);

      if (formValue.joinedDate) {
        formValue.joinedDate = +new Date(formValue.joinedDate).setHours(0, 0, 1);
      } else {
        delete formValue.joinedDate;
      }

      if (formValue.visibleUpTo) {
        formValue.visibleUpTo = Number(formValue.visibleUpTo);
      } else {
        delete formValue.visibleUpTo;
      }

      if (this.seelctedCategoryDetails.type == this.challengeCategoryTypes.GROUP) {
        delete formValue.totalWinner;
      }

      // if (this.seelctedCategoryDetails.type != this.challengeCategoryTypes.GROUP) {
        if (!formValue.benefitsCategoryId._id) {
          delete formValue.benefitsCategoryId;
          delete formValue.rewardId;
        }
  
        if (!formValue.classCategoryId._id) {
          delete formValue.classCategoryId;
        }
      // }

      /**
       * @FORCE_FULLY I'm doing this but not Intentionally
       */

      formValue.endDate = timeWithDateMs(formValue.endTime, formValue.endDate);
      delete formValue.endTime;

      if (this.seelctedCategoryDetails.type == this.challengeCategoryTypes.CHALLENGE || this.seelctedCategoryDetails.type == this.challengeCategoryTypes.GROUP) {

        // if(!formValue.frequencyType) {
        //   delete formValue.frequencyType;
        // }
        formValue.startDate = timeWithDateMs(formValue.startTime, formValue.startDate);
        delete formValue.startTime;

        if (formValue.startDate >= formValue.endDate) {
          this._toast.error(TIME_ERROR.GREATER_TIME);
          return
        }
      }

      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }

      if (this.challengeId) {
        if (this.challengeForm.dirty) {
          this.updateChallenge(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewChallenge(formValue);
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

  addNewChallenge(formBody: any) {
    this._challenge.addChallenge(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateChallenge(formBody: any) {
    formBody['challengeId'] = this.challengeId;
    this._challenge.updateChallenge(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    for (const key in this.challengeForm.value) {
      if (this.challengeForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (this.seelctedCategoryDetails.type == this.challengeCategoryTypes.CHALLENGE) {

      if (!this.f.startDate.value) {
        this.f.startDate.setErrors({ required: true });
      }

      if (!this.f.startTime.value) {
        this.f.startTime.setErrors({ required: true });
      }

      if (!this.f.startDate.valid) {
        this.f.startDate.setErrors({ 'invalid': true });
        return
      }

      if (!this.f.endDate.value) {
        this.f.endDate.setErrors({ required: true });
      }

      if (!this.f.type.value) {
        this.f.value.setErrors({ required: true });
      }

      if (!this.f.endDate.valid) {
        this.f.endDate.setErrors({ 'invalid': true });
        return
      }
    }

    // if (this.seelctedCategoryDetails.type != this.challengeCategoryTypes.GROUP) {
      if (this.f['benefitsCategoryId']['controls']._id.value && !this.f['rewardId']['controls']._id.value) {
        this.f['rewardId']['controls']._id.setErrors({ required: true });
      }
      this.joinedDateAndVisibilityValidations();
    // }

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
    this._router.navigate([CHALLENGES]);
  }

}
