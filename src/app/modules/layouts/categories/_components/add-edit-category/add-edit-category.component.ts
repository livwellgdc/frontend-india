import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CategoryService } from '../../_service/category.service';
import { CATEGORY_ACCESS_TYPE, CATEGORY_ERROR_MESSAGES, CATEGORY_TYPE, CHALLENGE_CATEGORY_TYPES, CHALLENGE_CATEGORY_TYPES_OBJECT } from 'src/app/constants/messages';
import { Subscription } from 'rxjs';
import { CharityService } from '../../../charity/_services/charity.service';

@Component({
  selector: 'lv-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
  providers: [S3BucketService, CharityService]
})
export class AddEditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  limit = LIMIT;
  errMsg = CATEGORY_ERROR_MESSAGES;
  cropFile: any;
  categoryAccessType = CATEGORY_ACCESS_TYPE;
  challengeCategoryTypes = CHALLENGE_CATEGORY_TYPES;
  challengeCategoryTypesObj = CHALLENGE_CATEGORY_TYPES_OBJECT;
  categoryTypes = CATEGORY_TYPE;
  private subscriptions: Subscription[] = [];
  public charityList: any = [];
  public charityIdForm: FormGroup;

  constructor(
    public _dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _category: CategoryService,
    private _toast: ToastService,
    private _charity: CharityService,
    private _s3: S3BucketService) { }
  public isApiCallInProgress = {
    ofCategory: true,
    ofBadge: true
  }

  ngOnInit() {
    this.createForm();
    if (this.data.id == 1) {
      this.patchCategoryData();
    }
  }

  createForm() {

    this.charityIdForm = this._fb.group({
      _id: [''],
      name: [''],
      logo: [''],
    });
    this.categoryForm = this._fb.group({
      image: [''],
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      accessType: [''],
      description: [''],
    })

    if (this.data.categoryType == this.categoryTypes.CHALLENGE) {
      this.categoryForm.addControl('entryFee', new FormControl());
      this.categoryForm.addControl('type', new FormControl());
      this.categoryForm.addControl('hasDonations', new FormControl(false));
      this.getCharityListing();
      if (this.data.id == 1 && this.data.data && this.data.data.hasDonations) {
        this.categoryForm.addControl('charityId', this.charityIdForm);
      }
    }
  }

  get f() { return this.categoryForm.controls; } //return form controls


  public categoryTypeHandler(challangeType: string) {

    if (this.challengeCategoryTypesObj.SERIES == this.f.type.value) {
      this.categoryForm.addControl('entryFee', new FormControl());
    } else if (this.challengeCategoryTypesObj.GROUP == this.f.type.value) {
      this.categoryForm.removeControl('entryFee');
      this.categoryForm.removeControl('charityId');
      this.categoryForm.addControl('hasDonations', new FormControl(false));
    } else {
      this.categoryForm.removeControl('entryFee');
    }
  }

  onDonationCheck() {
    if (this.f.hasDonations.value) {
      this.categoryForm.addControl('charityId', this.charityIdForm);

      if (this.challengeCategoryTypesObj.SERIES == this.f.type.value) {
        this.categoryForm.addControl('entryFee', new FormControl());
      }

    } else {
      this.categoryForm.removeControl('charityId');
      this.categoryForm.removeControl('entryFee');
    }
  }

  charitySelectionHandler(charityId: string) {
    for (let find = 0; find < this.charityList.length; find++) {
      if (charityId == this.charityList[find]._id) {
        this.f.charityId.patchValue(this.charityList[find]);
        break;
      }
    }
  }

  getCharityListing() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
    }
    this.subscriptions.push(
      this._charity.getCharityList(queryObj).subscribe(response => {
        this.isApiCallInProgress.ofCategory = false;
        if (response.statusCode === 200) {
          this.charityList = response.data;
          if (this.data.id == 1 && this.data.data && this.data.data.hasDonations) {
            this.charitySelectionHandler(this.data.data.charityId._id)
          }
        }
      }, () => {
        this.isApiCallInProgress.ofCategory = false;
      })
    );
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

  categoryHandler() {
    this.trimValues();
    if (this.categoryForm.valid) {
      if (!this.cropFile) {
        this.f.image.setErrors({ 'image': true });
        return
      } else {
        this.uploadImageFirst();
      }
    }
  }

  async uploadImageFirst() {
    if (this.data.id == 0) {
      await this.uploadImage();
      this.confirmAddCategory();
    } else {
      if (this.f.image.dirty) {
        await this.uploadImage();
        this.confirmEditCategory();
      } else {
        this.confirmEditCategory();
      }
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(this.cropFile.cropFile).then((response: any) => {
        if (response && response.Location) {
          this.f.image.setValue(response.Location);
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private removeUnwantedField(body): any {
    if (!body.type) {
      delete body.type;
    }
    if (!body.accessType) {
      delete body.accessType;
    }
    return body;
  }

  confirmAddCategory() {
    if (this.data.categoryType) {
      this.categoryForm.value['categoryType'] = this.data.categoryType;
    }
    let body = this.categoryForm.value;
    const reqData = this.removeUnwantedField(body);

    this._category.addCategory(reqData).subscribe((response: any) => {
      this.closePopup(response);
    }, (error) => {
      if (error.statusCode == 401) {
        this.closePopup('', false);
      }
    })
  }

  confirmEditCategory() {
    if (!this.categoryForm.dirty) {
      this._dialogRef.close(false);
      return
    }
    this.categoryForm.value['categoryId'] = this.data.data._id;
    if (this.data.categoryType) {
      this.categoryForm.value['categoryType'] = this.data.categoryType;
    }

    let body = this.categoryForm.value;
    const reqData = this.removeUnwantedField(body);

    this._category.updateCategory(reqData).subscribe((response: any) => {
      this.closePopup(response);
    }, (error) => {
      if (error.statusCode == 401) {
        this.closePopup('', false);
      }
    })
  }

  closePopup(response?, showMssg = true) {
    this._dialogRef.close({ isHitApi: showMssg ? true : false });
    if (showMssg) {
      this._toast.success(response.message);
    }
  }

  patchCategoryData() {
    this.categoryForm.patchValue(this.data.data);
    this.cropFile = {
      cropBase64: this.data.data.image,
      cropFile: this.data.data.image
    }
  }

  trimValues() {
    for (const key in this.categoryForm.value) {
      if (this.categoryForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.cropFile) {
      this.f.image.setErrors({ 'image': true });
      return
    }

  }

}
