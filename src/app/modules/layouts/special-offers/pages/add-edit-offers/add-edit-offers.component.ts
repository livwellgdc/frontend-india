import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SpecialOfferService } from '../../_service/special-offer.service';
import { LIMIT, REGEX } from '../../../../../constants/validator';
import { OFFER_ERROR_MESSAGES, INVALID_DATE_TIME_ERROR, OFFERS_TYPES, OFFERS_TYPES_OBJ } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { getRandomStringsArray, dateToMs } from '../../../../../constants/helper';
import { ShowCouponCodesComponent } from '../../../../../components/show-coupon-codes/show-coupon-codes.component';
import { BC_SPECIAL_OFFERS_ADD, BC_SPECIAL_OFFERS_EDIT } from '../../../../../constants/breadcrumb-routes';
import { SPECIAL_OFFERS } from '../../../../../constants/routes';

@Component({
  selector: 'lv-add-edit-offers',
  templateUrl: './add-edit-offers.component.html',
  styleUrls: ['./add-edit-offers.component.scss'],
  providers: [SpecialOfferService]
})
export class AddEditOffersComponent extends Pagination implements OnInit {

  offerForm: FormGroup;
  _limit = LIMIT;
  errMsg = { ...OFFER_ERROR_MESSAGES, ...INVALID_DATE_TIME_ERROR };
  offerId: string;
  offerDetails: SpecialOffer.SpecialOfferData;
  generatedOffers = [];
  public offer_types = OFFERS_TYPES;
  public offer_types_obj = OFFERS_TYPES_OBJ;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private _common: CommonService,
    private _special: SpecialOfferService,
    private _loc: Location,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this.offerId = this._actRoute.snapshot.params['offerId'];
    this.createForm();
    if (this.offerId) {
      this._bc.setBreadcrumb(BC_SPECIAL_OFFERS_EDIT);
      if (this._common.isValidId(this.offerId)) {
        this.getOfferDetails();
      }
    } else {
      this._bc.setBreadcrumb(BC_SPECIAL_OFFERS_ADD);
    }
  }

  createForm() {
    this.offerForm = this._fb.group({
      name: [''],
      discountPercent: [, [Validators.max(this._limit.MAX_DISCOUNT_VALUE), Validators.pattern(REGEX.AMOUNT)]],
      validity: [],
      quantity: [, [Validators.pattern(REGEX.AMOUNT)]],
      type: [''],
      limit: [''],
      discountCodes: ['']
    })
  }

  get f() { return this.offerForm.controls } //return sort form controls

  getOfferDetails() {
    this._special.getOfferDetail({ discountId: this.offerId }).subscribe((res: SpecialOffer.SpecialOfferDetail) => {
      if (res.statusCode == 200) {
        this.offerDetails = res.data;
        this.offerForm.patchValue(this.offerDetails);
        this.f.validity.setValue(new Date(this.offerDetails.validity));
        this.generatedOffers = this.offerDetails.discountCodes;
        this.f.quantity.setValue(this.generatedOffers.length);
      }
    })
  }

  public offerTypeSelection(offerType) {
    if(offerType == this.offer_types_obj.SPECIAL) {
      this.offerForm.addControl('quantity', new FormControl());
      this.offerForm.removeControl('discountCodes');
      this.offerForm.removeControl('limit');
    } else {
      this.offerForm.addControl('discountCodes', new FormControl());
      this.offerForm.addControl('limit', new FormControl());
      this.offerForm.removeControl('quantity');
    }
  }

  autoGenerateOfferCode() {
    if (this.offerId && this.offerDetails.isDisabled) {
      // this._toast.error(NOT_UPDATED);
    } else {
      if (Number(this.f.quantity.value)) {
        this.generatedOffers = getRandomStringsArray(Number(this.f.quantity.value));
      }
    }
  }

  showCouponCode() {
    if (this.offerId && this.offerDetails.isDisabled) {
      // this._toast.error(NOT_UPDATED);
    } else {
      if (Number(this.f.quantity.value)) {
        this.openCodeDialog(this.generatedOffers);
      }
    }
  }

  openCodeDialog(arrayOfCode) {
    if (arrayOfCode.length > 0) {
      this._dialog.open(ShowCouponCodesComponent, {
        data: {
          couponCodeArray: arrayOfCode
        }
      });
    }
  }

  offerHandler() {
    this.trimValues();
    if (this.offerForm.valid) {
      let formValue = this.objectFormation();
      if (this.offerId) {
        if (this.offerForm.dirty) {
          this.updateOffers(formValue);
        } else {
          this.navigate();
        }
      } else {
        this.addNewOffers(formValue);
      }
    }
  }

  objectFormation() {
    let formValue = this.offerForm.value;

    formValue.discountPercent = Number(formValue.discountPercent);
    formValue.validity = dateToMs(formValue.validity, true);
    formValue['discountCodes'] = this.generatedOffers && this.generatedOffers.length ? this.generatedOffers : [this.f.discountCodes.value];
    delete formValue.quantity;

    return formValue;
  }

  addNewOffers(formValue: any) {
    this._special.addOffer(formValue).subscribe(res => {
      if (res.statusCode === 201) {
        this.navigate(res.message);
      }
    })
  }

  updateOffers(formValue: any) {
    formValue['discountId'] = this.offerId;
    this._special.updateOffer(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }


  trimValues() {
    for (const key in this.offerForm.value) {
      if (this.offerForm.value.hasOwnProperty(key) && typeof this.f[key].value == "string") {
        this.f[key].setValue(this.f[key].value.trim());
      }
    }

    if (!this.f.validity.value) {
      this.f.validity.setErrors({ required: true });
    }

    if (!this.f.validity.valid) {
      this.f.validity.setErrors({ 'invalid': true });
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
    this._router.navigate([SPECIAL_OFFERS]);
  }

}
