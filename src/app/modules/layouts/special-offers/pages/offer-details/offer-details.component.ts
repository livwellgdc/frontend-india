import { Component, OnInit } from '@angular/core';
import { EDIT, SPECIAL_OFFERS } from '../../../../../constants/routes';
import { DATE_TYPES, OFFERS_TYPES_OBJ } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BC_SPECIAL_OFFERS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { SpecialOfferService } from '../../_service/special-offer.service';
import { ShowCouponCodesComponent } from '../../../../../components/show-coupon-codes/show-coupon-codes.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'lv-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  providers: [SpecialOfferService]
})
export class OfferDetailsComponent implements OnInit {
  offerDetails: SpecialOffer.SpecialOfferData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  offerId: string;
  subscriptions: Subscription[] = [];
  public offer_types_obj = OFFERS_TYPES_OBJ;

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _special: SpecialOfferService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SPECIAL_OFFERS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['offerId'])) {
      this.offerId = this._actRoute.snapshot.params['offerId'];
      this.fetchClientClubDetails();
    }
  }

  fetchClientClubDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._special.getOfferDetail({ discountId: this.offerId }).subscribe((res: SpecialOffer.SpecialOfferDetail) => {
        this.isApiCallInProgress = false;
        this.offerDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([SPECIAL_OFFERS]);
        }
      })
    );
  }

  openCodeBox(codes) {
    if (this.offerDetails.discountCodes.length > 1) {
      this._dialog.open(ShowCouponCodesComponent, {
        data: {
          couponCodeArray: codes
        }
      })
    }
  }

  downloadCouponCodes(codes, fileName: string) {
    this._common.downloadInCsvFormat(codes, ['Code'], true, fileName);
  }

  editHandler() {
    this._router.navigate([`${SPECIAL_OFFERS}/${EDIT}`, this.offerDetails._id]);
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
