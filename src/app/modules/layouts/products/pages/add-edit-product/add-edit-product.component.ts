import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { FilesUploadComponent } from '../../../../../components/files-upload/files-upload.component';
import { S3BucketService } from '../../../../../services/s3-bucket/s3-bucket.service';
import { ProductService } from '../../_service/product.service';
import { Pagination } from '../../../../../constants/paginator';
import { UploadPopupComponent } from '../../../../../components/cropper/upload-popup/upload-popup.component';
import { LIMIT } from '../../../../../constants/validator';
import { PRODUCT_ERROR_MESSAGES, INVALID_DATE_TIME_ERROR, ALL_MEDIA_ERROR, IMAGE_FORMAT, VIDEO_FORMAT, DOC_FORMAT } from '../../../../../constants/messages';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { PRODUCTS } from 'src/app/constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_PRODUCTS_EDIT, BC_PRODUCTS_COPY } from '../../../../../constants/breadcrumb-routes';
import { CommonService } from '../../../../../services/common/common.service';

@Component({
  selector: 'lv-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  providers: [ProductService, S3BucketService]
})
export class AddEditProductComponent extends Pagination implements OnInit {

  @ViewChild(FilesUploadComponent, { static: true }) filesUploadComponent: FilesUploadComponent;

  productForm: FormGroup;
  productId: string;
  copyProductId: string;
  copyChallengeId: string;
  challengeDetails: Challenge.ChallengeData;
  productDetails: any;
  cropFile: any;
  productImage: any;
  categoryList = [];
  challengeId: string;
  variantAssetCropFile: any = [];
  benefitCategoryList = [];
  _limit = LIMIT;
  errMsg = { ...PRODUCT_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  productVariant: number;
  addLWC: boolean = true;
  public seelctedCategoryDetails: any;
  fileFormat = IMAGE_FORMAT + ',' + VIDEO_FORMAT + ',' + DOC_FORMAT;
  postMediaError = ALL_MEDIA_ERROR;
  assetList = ['IMAGE', 'VIDEO'];
  isApiCallInProgress = {
    ofCategory: true,
    ofBadge: true
  }

  constructor(
    private _fb: FormBuilder,
    private _product: ProductService,
    private _s3: S3BucketService,
    private _dialog: MatDialog,
    private _toast: ToastService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _bc: BreadcrumbService,
    private _common: CommonService,
  ) {
    super();
  }

  ngOnInit() {
    this.productId = this._actRoute.snapshot.params['productId'];
    this.copyProductId = this._actRoute.snapshot.queryParams['copyProduct'];
    this.createForm();
    this.getCategoryList(this.API_EVENT.producstStore)
    if (this.productId) {
      this._bc.setBreadcrumb(BC_PRODUCTS_EDIT);
      this._createMultipleLwcOfferList()
      if (this._common.isValidId(this.productId)) {
        this.getProductDetails();
      }
    } else if (this.copyProductId) {
      this._bc.setBreadcrumb(BC_PRODUCTS_COPY);
      if (this._common.isValidId(this.copyProductId)) {
        this.getProductDetails();
      }
    } else {
      this.addLwcOfferList();
      this.addSpecification();
      this.addVariantsList(0);
    }
  }

  createForm() {
    this.productForm = this._fb.group({
      name: this._fb.group({
        en: [''],
        vi: ['']
      }),
      image: [''],
      description: this._fb.group({
        en: [''],
        vi: ['']
      }),
      price: [''],
      discount: [''],
      code: [''],
      manufacturer: [''],
      isLWCApplicable: [true],
      offers: this._fb.group({
        en: [''],
        vi: ['']
      }),
      returnAndExchange: this._fb.group({
        en: [''],
        vi: ['']
      }),
      warranty: this._fb.group({
        en: [''],
        vi: ['']
      }),
      fetures: this._fb.group({
        en: [''],
        vi: ['']
      }),
      benifits: this._fb.group({
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
        categoryType: ['']
      }),
      isFeatured: [false],
      isNewProduct: [false],
      specifications: this._fb.array([]),
      lwcOfferList: this._fb.array([]),
      variants: this._fb.array([])
    })
  };

  get f() { return this.productForm.controls };

  get specifications() {
    return this.productForm.get("specifications") as FormArray;
  }

  private _createMultipleSpecifications(data?: any): FormGroup {
    return this._fb.group({
      title: [data ? data.title : ''],
      value: [data ? data.value : ''],
    });
  }

  addSpecification(data?: any) {
    this.specifications.push(this._createMultipleSpecifications(data));
    this.specifications.markAsDirty();
  }

  removeSpecification(index: any) {
    this.specifications.removeAt(index);
  }

  private _createMultipleLwcOfferList(data?: any): FormGroup {
    return this._fb.group({
      lwc: [data ? data.lwc : ''],
      price: [data ? data.price : '']
    });
  }

  get lwcOfferList() {
    return this.productForm.get("lwcOfferList") as FormArray;
  }

  addLwcOfferList(data?: any) {
    this.lwcOfferList.push(this._createMultipleLwcOfferList(data));
    this.lwcOfferList.markAsDirty();
  }

  removeLwcOfferList(index: any) {
    this.lwcOfferList.removeAt(index);
  }

  get variants() {
    return this.productForm.get("variants") as FormArray;
  }

  private _createMultipleVariantsList(data?: any): FormGroup {
    return this._fb.group({
      color: [data ? data.color : ''],
      colorCode: [data ? data.quantity : ''],
      quantity: [data ? data.quantity : ''],
      assets: this._fb.array([])
    });
  }

  addVariantsList(variantIndex: number, data?: any) {
    this.productVariant = variantIndex
    this.variants.push(this._createMultipleVariantsList(data));
    this.variants.markAsDirty();
    if (data && data.assets.length > 0) {
      data.assets.forEach((asset: any, assetIndex: number) => {
        if (!asset.thumbnail) {
          asset.thumbnail = '';
        }
        this.addAssetsList(variantIndex, asset);
        let imageResult = {
          cropBase64: asset.url,
          cropFile: asset.url
        }
        if (this.variantAssetCropFile[variantIndex]) {
          this.variantAssetCropFile.splice(variantIndex, 1, [...this.variantAssetCropFile[variantIndex], imageResult]);
        }
        else {
          this.variantAssetCropFile.splice(variantIndex, 0, [imageResult]);
        }
      })
    } else {
      this.addAssetsList(variantIndex);
    }
  }

  removeVariantsList(index: any) {
    this.variants.removeAt(index);
  }

  variantAssets(index: any) {
    return this.variants.at(index).get("assets") as FormArray;
  }

  private _createMultipleAssetsList(data?: any): FormGroup {
    return this._fb.group({
      type: [data ? data.type : ''],
      thumbnail: [data ? data.thumbnail : 'NA'],
      url: [data ? data.url : ''],
    });
  }

  addAssetsList(indexOfVariant: number, data?: any) {
    this.variantAssets(indexOfVariant).push(this._createMultipleAssetsList(data));
    this.variantAssets(indexOfVariant).markAsDirty();
  }

  removeAssetsList(indexOfVariant: number, index: number) {
    this.variantAssets(indexOfVariant).removeAt(index);
  }

  onSelectFile(variantIndex: number, assetsIndex: number, type?: string) {
    const dialogRef = this._dialog.open(UploadPopupComponent, {
      width: '1150px',
      panelClass: 'cropper_dialog',
      data: { inputRatio: 5 / 5.0001, inputWidth: 300, type: 'PRODUCT' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type === "IMAGE") {
          this.cropFile = result;
          this.f.image.setErrors(null);
          this.f.image.markAsDirty();
        } else {
          if (this.variantAssetCropFile[variantIndex]) {
            if (this.variantAssetCropFile[variantIndex][assetsIndex]) {
              this.variantAssetCropFile[variantIndex][assetsIndex] = result;
            } else {
              this.variantAssetCropFile.splice(variantIndex, 1, [...this.variantAssetCropFile[variantIndex], result])
            }
          }
          else {
            this.variantAssetCropFile.splice(variantIndex, 0, [result])
          }
        }
        this.uploadImage(variantIndex, assetsIndex, type);
      }
    });
  }

  uploadImage(variantIndex: number, assetsIndex: number, type) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(type ? this.cropFile.cropFile : this.variantAssetCropFile[variantIndex][assetsIndex].cropFile).then((response: any) => {
        if (response && response.Location) {
          if (type === "IMAGE") {
            this.productForm.value["image"] = response.Location;
            this.productImage = response.Location
          } else {
            if (this.variantAssets(variantIndex).controls[assetsIndex].value.type == 'IMAGE') {
              this.variantAssets(variantIndex).controls[assetsIndex].value.url = response.Location;
            } else {
              this.variantAssets(variantIndex).controls[assetsIndex].value.thumbnail = response.Location;
            }
          }
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  async productHandler() {
    if (this.productForm.valid) {
      let formValue = this.productForm.value;
      formValue.price = Number(formValue.price);
      formValue.discount = Number(formValue.discount);
      formValue.variants.forEach((value: any) => {
        value.quantity = Number(value.quantity);
        value.color = value.color.toUpperCase();
      });
      formValue.lwcOfferList.forEach((value: any) => {
        value.lwc = Number(value.lwc);
        value.price = Number(value.price);
      });
      formValue.image = this.productImage;
      if (this.productId) {
        if (this.productForm.dirty) {
          this.updateProduct(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewProduct(formValue);
      }
    }
  }

  updateProduct(formBody: any) {
    formBody['productId'] = this.productId;
    this._product.updateProduct(formBody).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  addNewProduct(formBody: any) {
    this._product.addProduct(formBody).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  onChangeLWC(value: any) {
    if (!value) {
      this.addLWC = false;
    } else {
      this.addLWC = true;
    }
  }

  async onChangeFilesHandler(event, variantIndex: number, assetsIndex: number) {
    return new Promise((resolve, reject) => {
      this._s3.uploadFile(event.url, event.type.split("/")[1]).then((response: any) => {
        if (response && response.Location) {
          this.variantAssets(variantIndex).controls[assetsIndex].value.url = response.Location;
          resolve(true);
        }
      }, (error) => {
        reject(error);
      })
    })

  }

  assetSelectionHandler(type, variantIndex, assetsIndex) {
    if (type == 'IMAGE') {
      // this.variantAssets(variantIndex).controls[assetsIndex].value.url = 
    }
  }

  cancelHandler() {

  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([PRODUCTS]);
  }

  getProductDetails() {
    this._product.getProductDetail({ productId: this.productId ? this.productId : this.copyProductId }).subscribe((res: Challenge.ChallengeDetail) => {
      if (res.statusCode == 200) {
        this.productDetails = res.data;
        console.log(res.data)
        this.cropFile = {
          cropBase64: this.productDetails.image,
          cropFile: this.productDetails.image
        }
        this.productForm.patchValue(this.productDetails);
        this.productDetails.lwcOfferList.forEach((lwcOffer: object) => {
          this.addLwcOfferList(lwcOffer);
        });
        this.productDetails.specifications.forEach((specification: object) => {
          this.addSpecification(specification);
        });
        this.f.image.setValue(this.productDetails.image);
        this.productImage = this.productDetails.image;
        this.productDetails.variants.forEach((variant: object, index: any) => {
          this.addVariantsList(index, variant);
        });
        console.log(this.productForm)
      }
    })
  }

  categorySelectionHandler(categoryId: string) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (categoryId == this.categoryList[find]._id) {
        this.seelctedCategoryDetails = this.categoryList[find];

       

        console.log("this.seelctedCategoryDetails==============", this.seelctedCategoryDetails);
        this.f.categoryId.patchValue(this.seelctedCategoryDetails);
        console.log("this.seelctedCategoryDetails==============", this.productForm.value);
        break;
      }
    }
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
      console.log("=============<<<", res)
      if (res.statusCode === 200) {
          this.categoryList = res.data;
          if (this.challengeId || this.copyChallengeId) {
            this.categorySelectionHandler(this.challengeDetails.categoryId._id);
          }
        }  else {
          this.benefitCategoryList = res.data;
        }
    }, () => {
      this.isApiCallInProgress.ofCategory = false;
    })
  }

}
