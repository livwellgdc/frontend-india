import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { LivwellVideoService } from '../../_service/livwell-video.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { LIVWELL_VIDEOS } from '../../../../../constants/routes';
import { LIVWELL_VIDEOS_ERROR_MESSAGES } from '../../../../../constants/messages';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { BC_LIVWELL_VIDEOS_ADD, BC_LIVWELL_VIDEOS_EDIT } from '../../../../../constants/breadcrumb-routes';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-add-edit-livwell-videos',
  templateUrl: './add-edit-livwell-videos.component.html',
  styleUrls: ['./add-edit-livwell-videos.component.scss'],
  providers: [LivwellVideoService]
})
export class AddEditLivwellVideosComponent extends Pagination implements OnInit, OnDestroy {

  videoContentForm: FormGroup;
  _limit = LIMIT;
  errMsg = LIVWELL_VIDEOS_ERROR_MESSAGES;
  videoId: string;
  videoDetails: LivwellVideo.LivwellVideoData;
  genericCategories = [];

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    public _common: CommonService,
    private _livwellVideo: LivwellVideoService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute
  ) { super() }

  ngOnInit() {
    this.videoId = this._actRoute.snapshot.params['videoId'];
    this.createForm();
    this.getGenericCategories(this.API_EVENT.generic);
    if (this.videoId) {
      this._bc.setBreadcrumb(BC_LIVWELL_VIDEOS_EDIT);
      if (this._common.isValidId(this.videoId)) {
        this.getVideoDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_LIVWELL_VIDEOS_ADD);
    }
  }

  createForm() {
    this.videoContentForm = this._fb.group({
      title: this._fb.group({
        en: [''],
        vi: ['']
      }),
      videoLink: ['', [Validators.pattern(REGEX.URL)]],
      points: [],
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      categoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        image: [''],
        status: [''],
        accessType: ['']
      })
    })
  }

  get f() { return this.videoContentForm.controls }; //return form controls


  getGenericCategories(categoryType: string) {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: categoryType,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      this._common.isApiCallInProgress.ofCategory = false;
      if (res.statusCode === 200) {
        this.genericCategories = res.data;
      }
    }, () => {
      this._common.isApiCallInProgress.ofCategory = false;
    })
  }

  getVideoDetails() {
    this._livwellVideo.getVideoDetail({ videoId: this.videoId }).subscribe((res: LivwellVideo.LivwellVideoDetail) => {
      if (res.statusCode == 200) {
        this.videoDetails = res.data;
        this.videoContentForm.patchValue(this.videoDetails);
      }
    })
  }

  categorySelectionHandler(categoryId: string) {
    for (let find = 0; find < this.genericCategories.length; find++) {
      if (categoryId == this.genericCategories[find]._id) {
        this.f.categoryId.patchValue(this.genericCategories[find]);
        break;
      }
    }
  }

  videoContentHandler() {

    this.checkValidation();
    if (this.videoContentForm.valid) {
      let formValue = this.videoContentForm.value;
      formValue.points = Number(formValue.points);

      if (this.videoId) {
        if (this.videoContentForm.dirty) {
          this.updateLivwellVideo(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewVideo(formValue);
      }
    }

  }

  addNewVideo(formValue: any) {
    this._livwellVideo.addVideo(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateLivwellVideo(formValue: any) {
    formValue['videoId'] = this.videoId;
    this._livwellVideo.updateVideo(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }


  checkValidation() {
    for (const key in this.videoContentForm.value) {
      if (this.videoContentForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([LIVWELL_VIDEOS]);
  }

  ngOnDestroy() {
    this._common.isApiCallInProgress.ofCategory = true;
  }

}
