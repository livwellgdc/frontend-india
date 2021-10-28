import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ALL_MEDIA_ERROR, IMAGE_FORMAT, VIDEO_FORMAT, DOC_FORMAT, POST_ERROR_MESSAGES } from '../../../../../constants/messages';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { PostService } from '../../_service/post.service';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { Pagination } from '../../../../../constants/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_POSTS_ADD, BC_POSTS_EDIT } from '../../../../../constants/breadcrumb-routes';
import { FilesUploadComponent } from '../../../../../components/files-upload/files-upload.component';
import { POSTS } from '../../../../../constants/routes';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../components/toast-notification/toast.service';

@Component({
  selector: 'lv-add-edit-posts',
  templateUrl: './add-edit-posts.component.html',
  styleUrls: ['./add-edit-posts.component.scss'],
  providers: [S3BucketService, PostService]
})
export class AddEditPostsComponent extends Pagination implements OnInit {
  postForm: FormGroup;
  postId: string;
  postDetails: any;
  fileFormat = IMAGE_FORMAT + ',' + VIDEO_FORMAT + ',' + DOC_FORMAT;
  postMediaError = ALL_MEDIA_ERROR;
  boardList = [];
  _limit = LIMIT;
  errMsg = POST_ERROR_MESSAGES;
  @ViewChild(FilesUploadComponent, { static: true }) filesUploadComponent: FilesUploadComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _post: PostService,
    private _s3: S3BucketService,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _common: CommonService,
    private _loc: Location,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this.postId = this._actRoute.snapshot.params['postId'];
    this.createForm();
    this.getBoards();
    if (this.postId) {
      this._bc.setBreadcrumb(BC_POSTS_EDIT);
      if (this._common.isValidId(this.postId)) {
        this.getPostDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_POSTS_ADD);
    }
  }

  createForm() {
    this.postForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      externalLink: ['', [Validators.pattern(REGEX.URL)]],
      boardId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        status: ['']
      }),
    })
  }

  get f() { return this.postForm.controls } // return all sort form controls

  getBoards() {
    this._post.getBoardList({ status: this.API_EVENT.active }).subscribe(res => {
      if (res && res.statusCode == 200) {
        this.boardList = res.data;
      }
    })
  }

  getPostDetails() {
    this._post.getPostDetail({ postId: this.postId }).subscribe((res: any) => {
      if (res && res.statusCode == 200) {
        this.postDetails = res.data;
        if ('media' in this.postDetails) {
          this.postDetails.media = [this.postDetails.media];
          this.filesUploadComponent.urls = this.postDetails.media.map(x => x.url);
        }
        this.postForm.patchValue(this.postDetails);
      }
    })
  }

  onChangeFilesHandler(event?) {
    this.postForm.markAsDirty();
  }

  boardSelectionHandler(boardId: string) {
    for (let find = 0; find < this.boardList.length; find++) {
      if (boardId == this.boardList[find]._id) {
        this.f.boardId.patchValue(this.boardList[find]);
        break;
      }
    }
  }

  async postHandler() {
    this.checkValidation();
    if (this.postForm.valid) {
      let formValue = this.postForm.value;

      let alreadyUploadedMedia = [];
      if (this.postDetails && 'media' in this.postDetails && this.postDetails.media.length) {
        alreadyUploadedMedia = this.postDetails.media.filter(
          x => this.filesUploadComponent._store.find(item => item.url == x.url)
        );
      }
      formValue['media'] = alreadyUploadedMedia;

      let media = this.filesUploadComponent._store.filter(
        x => !this.postDetails || !('media' in this.postDetails) || !this.postDetails.media.find(item => item.url == x.url)
      );
      if (media.length) {
        let results = await this._s3.uploadMultipleFiles(media.map(item => item.file));
        media.forEach((item, index) => {
          formValue.media = results[index].Location;
        })
      } else {
        if (formValue['media'].length > 0) {
          formValue.media = formValue['media'][0].url;
        } else {
          delete formValue['media'];
        }
      }

      if (this.postId) {
        if (this.postForm.dirty) {
          this.updatePost(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewPost(formValue);
      }
    }
  }

  addNewPost(formBody: any) {
    this._post.addPost(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updatePost(formBody: any) {
    formBody['postId'] = this.postId;
    this._post.updatePost(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    for (const key in this.postForm.value) {
      if (this.postForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([POSTS]);
  }

}
