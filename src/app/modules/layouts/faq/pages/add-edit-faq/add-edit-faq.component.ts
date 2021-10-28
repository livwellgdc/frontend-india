import { Component, OnInit } from '@angular/core';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { FAQ_ERROR_MESSAGES } from '../../../../../constants/messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../../services/common/common.service';
import { FaqService } from '../../_service/faq.service';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { BC_FAQ_EDIT, BC_FAQ_ADD } from '../../../../../constants/breadcrumb-routes';
import { FAQ } from './../../../../../constants/routes';
import { dataURLtoFile } from '../../../../../constants/helper';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'lv-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.scss'],
  providers: [S3BucketService, FaqService]
})
export class AddEditFaqComponent implements OnInit {
  faqForm: FormGroup;
  _limit = LIMIT;
  errMsg = FAQ_ERROR_MESSAGES;
  faqId: string;
  faqDetails: Faq.FaqData;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _common: CommonService,
    private _faq: FaqService,
    private _s3: S3BucketService,
    private _toast: ToastService,
    private _loc: Location
  ) { }

  ngOnInit() {
    this.faqId = this._actRoute.snapshot.params['faqId'];
    this.createForm();
    if (this.faqId) {
      this._bc.setBreadcrumb(BC_FAQ_EDIT);
      if (this._common.isValidId(this.faqId)) {
        this.getFaqDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_FAQ_ADD);
    }
  }

  createForm() {
    this.faqForm = this._fb.group({
      question: this._fb.group({
        en: [''],
        vi: ['']
      }),
      enAnswer: ['', Validators.required],
      viAnswer: ['', Validators.required],
      position: [, [Validators.pattern(REGEX.AMOUNT)]],
    });
  }

  get f() { return this.faqForm.controls; } // return form controls

  getFaqDetails() {
    this._faq.getFaqDetails({ faqId: this.faqId }).subscribe((res: Faq.FaqDetail) => {
      this.faqForm.patchValue(res.data);
    });
  }

  async registerFaqHandler() {
    if (this.faqForm.valid) {
      this.getQuilEditorImages(() => {
        let formValue = this.faqForm.value;
        formValue.position = Number(formValue.position);

        if (this.faqId) {
          if (this.faqForm.dirty) {
            this.updateFaq(formValue);
          } else {
            this.navigate();
          }
        } else {
          this.addFaq(formValue);
        }
      });
    } else {
      this.f.enAnswer.markAsDirty();
      this.f.viAnswer.markAsDirty();
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
    this.f.enAnswer.setValue(getFullDom1);


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
    this.f.viAnswer.setValue(getFullDom2);

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

  addFaq(formBody: any) {
    this._faq.addFaq(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    });
  }

  updateFaq(formBody: any) {
    formBody["faqId"] = this.faqId;
    this._faq.updateFaq(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    });
  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([FAQ]);
  }
}

