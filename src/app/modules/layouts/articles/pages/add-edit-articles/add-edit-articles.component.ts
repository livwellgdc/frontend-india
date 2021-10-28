import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { ARTICLE_ERROR_MESSAGES } from '../../../../../constants/messages';
import { ArticleService } from '../../_service/article.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_ARTICLES_EDIT, BC_ARTICLES_ADD } from '../../../../../constants/breadcrumb-routes';
import { Pagination } from '../../../../../constants/paginator';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ARTICLES } from '../../../../../constants/routes';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';

@Component({
  selector: 'lv-add-edit-articles',
  templateUrl: './add-edit-articles.component.html',
  styleUrls: ['./add-edit-articles.component.scss'],
  providers: [ArticleService, S3BucketService]
})
export class AddEditArticlesComponent extends Pagination implements OnInit {

  articleForm: FormGroup;
  articleId: string;
  _limit = LIMIT;
  errMsg = ARTICLE_ERROR_MESSAGES;
  categoryList = [];
  articleDetails: Article.ArticleData;
  cropFile: any;

  constructor(
    private _fb: FormBuilder,
    private _bc: BreadcrumbService,
    private _article: ArticleService,
    private _actRoute: ActivatedRoute,
    private _s3: S3BucketService,
    private _toast: ToastService,
    private _common: CommonService,
    private _loc: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this.articleId = this._actRoute.snapshot.params['articleId'];
    this.createForm();
    this.getCategoryList();
    if (this.articleId) {
      this._bc.setBreadcrumb(BC_ARTICLES_EDIT);
      if (this._common.isValidId(this.articleId)) {
        this.getArticleDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_ARTICLES_ADD);
    }
  }

  createForm() {
    this.articleForm = this._fb.group({
      image: [''],
      title: [''],
      description: [''],
      categoryId: this._fb.group({
        _id: [''],
        name: this._fb.group({
          en: [''],
          vi: ['']
        }),
        description: [''],
        image: [''],
        status: [''],
        created: []
      }),
      articleLink: ['', [Validators.pattern(REGEX.URL)]],
      authorName: [''],
      isRecommended: [false]
    })
  }

  get f() { return this.articleForm.controls } //return form controls

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

  getArticleDetails() {
    this._article.getArticleDetail({ articleId: this.articleId }).subscribe((res: Article.ArticleDetail) => {
      if (res.statusCode == 200) {
        this.articleDetails = res.data;
        if (this.articleDetails.image) {
          this.cropFile = {
            cropBase64: this.articleDetails.image,
            cropFile: this.articleDetails.image
          }
        }
        this.articleForm.patchValue(this.articleDetails);
        this.f.image.setValue(this.articleDetails.image);
      }
    })
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.generic,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      if (res.statusCode === 200) {
        this.categoryList = res.data;
      }
    })
  }

  categorySelectionHandler(categoryId: string) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (categoryId == this.categoryList[find]._id) {
        this.f.categoryId.patchValue(this.categoryList[find]);
        break;
      }
    }
  }

  async articleHandler() {
    this.checkValidation();
    if (this.articleForm.valid) {
      let formValue = this.articleForm.value;
      if (this.cropFile && this.f.image.dirty) {
        await this.uploadImage(formValue);
      }
      if (this.articleId) {
        if (this.articleForm.dirty) {
          this.updateArticle(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewArticle(formValue);
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

  addNewArticle(formBody: any) {
    this._article.addArticle(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateArticle(formBody: any) {
    formBody['articleId'] = this.articleId;
    this._article.updateArticle(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {
    for (const key in this.articleForm.value) {
      if (this.articleForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
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
    this._router.navigate([ARTICLES]);
  }

}
