import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { CmsService } from '../../_service/cms.service';
import { dataURLtoFile } from '../../../../../constants/helper';
import { CMS_TYPE, EDITOR_COMMON_MESSAGES, SECTION_ID_OF } from '../../../../../constants/messages';
import { TERM_CONDITIONS, PRIVACY_POLICY, CONTACT_US, ABOUT_US } from '../../../../../constants/routes';
import { BC_TERM_CONDTIONS, BC_PRIVACY_POLICY, BC_ABOUT_US, BC_CONTACT_US } from '../../../../../constants/breadcrumb-routes';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common/common.service';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [S3BucketService, CmsService]
})
export class EditorComponent extends Pagination implements OnInit, OnDestroy {
  @Input() currentUrl: any;
  cmsForm: FormGroup;
  contentData = '';
  isApiCallInProgress = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _cms: CmsService,
    private _toast: ToastService,
    private _bc: BreadcrumbService,
    private _s3: S3BucketService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.CMS);
    this.createForm();
    this.getContent();
  }

  createForm() {
    this.cmsForm = this._fb.group({
      enData: [''],
      viData: ['']
    })
  }
  get f() { return this.cmsForm.controls }  // return form controls

  /**
   * @contentType get content basis of content type
   */
  getContent() {
    switch (this.currentUrl) {
      case TERM_CONDITIONS:
        this._bc.setBreadcrumb(BC_TERM_CONDTIONS);
        this.getContentOnType(CMS_TYPE.TERM_CONDITION);
        break;
      case PRIVACY_POLICY:
        this._bc.setBreadcrumb(BC_PRIVACY_POLICY);
        this.getContentOnType(CMS_TYPE.PRIVACY_POLICY);
        break;
      case ABOUT_US:
        this._bc.setBreadcrumb(BC_ABOUT_US);
        this.getContentOnType(CMS_TYPE.ABOUT_US);
        break;
      case CONTACT_US:
        this._bc.setBreadcrumb(BC_CONTACT_US);
        this.getContentOnType(CMS_TYPE.CONTACT_US);
        break;
      default:
        break;
    }
  }

  getContentOnType(type: string) {
    const typeObj = {
      type: type
    }
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._cms.getCmsContent(typeObj).subscribe((content) => {
        this.isApiCallInProgress = false;
        if (content && content.data && content.data.enData && content.data.viData) {
          this.contentData = content.data.enData;
          this.f.enData.setValue(content.data.enData);
          this.f.viData.setValue(content.data.viData);
        }
      }, (error) => {
        this.isApiCallInProgress = false;
      })
    );
  }

  updateContentHandler() {
    if (!this.permissionClass) {
      switch (this.currentUrl) {
        case TERM_CONDITIONS:
          this.updateOnType(CMS_TYPE.TERM_CONDITION);
          break;
        case PRIVACY_POLICY:
          this.updateOnType(CMS_TYPE.PRIVACY_POLICY);
          break;
        case ABOUT_US:
          this.updateOnType(CMS_TYPE.ABOUT_US);
          break;
        case CONTACT_US:
          this.updateOnType(CMS_TYPE.CONTACT_US);
          break;
        default:
          break;
      }
    }
  }

  /**
   * @contentType update content basis of content type
   */
  updateOnType(type: string) {
    if (this.f.enData.value && this.f.viData.value) {
      if (this.cmsForm.dirty) {
        this.getQuilEditorImages(() => {
          this.cmsForm.value['type'] = type;
          this._cms.editCmsContent(this.cmsForm.value).subscribe(() => {
            this._toast.success(EDITOR_COMMON_MESSAGES.CMS_ACTION(this.contentData ? 'updated' : 'added'));
            this.contentData = this.cmsForm.value.enData;
          })
        });
      }
    } else {
      this._toast.info(EDITOR_COMMON_MESSAGES.CONTENT_REQ);
    }
  }

  /**
  * @function getQuilEditorImages
  * @summary get images from editor and convert that base64 to image file by running a loop asynchronously and then make a api call
  * @param callback @returns confirm Going to API
  */
  async getQuilEditorImages(callback?) {

    const getQlEditor1: any = document.querySelectorAll('#ql-editor1 img');
    for (let find = 0; find < getQlEditor1.length; find++) {
      const currentBase64 = getQlEditor1[find].src;
      if (currentBase64.length > 500) {
        await this.fileReaderBase64ToFile(currentBase64).then(res => {
          getQlEditor1[find].src = res;
        });
      }
    }
    const getFullDom1 = document.getElementById("ql-editor1").innerHTML;
    this.f.enData.setValue(getFullDom1);


    const getQlEditor2: any = document.querySelectorAll('#ql-editor2 img');
    for (let find = 0; find < getQlEditor2.length; find++) {
      const currentBase64 = getQlEditor2[find].src;
      if (currentBase64.length > 500) {
        await this.fileReaderBase64ToFile(currentBase64).then(res => {
          getQlEditor2[find].src = res;
        });
      }
    }
    const getFullDom2 = document.getElementById("ql-editor2").innerHTML;
    this.f.viData.setValue(getFullDom2);

    callback(true);
  }

  /**
   * @function fileReaderBase64ToFile
   * @summary converting base64 to file
   * @param file base64 file got from editor
   */
  fileReaderBase64ToFile(file: any) {
    return new Promise((resolve, reject) => {
      dataURLtoFile(file, null, (result) => {
        this.uploadImage(result, function (imageURL) {
          resolve(imageURL)
        })
      })
    });
  }

  /**
   * @function uploadImage
   * @summary upload file to S3
   * @param file file to upload
   * @param callback @returns url recieved from S3
   */
  uploadImage(file: any, callback?) {
    this._s3.uploadFile(file).then((res: any) => {
      callback(res.Location);
    })
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
