import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../_service/payment.service';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BC_PAYMENTS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { PAYMENTS } from '../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';

@Component({
  selector: 'lv-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
  providers: [PaymentService]
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetails: any;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _payment: PaymentService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PAYMENTS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['transactionId'])) {
      this.fetchPaymentDetails();
    }
  }

  fetchPaymentDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._payment.getPaymentDetail(this._actRoute.snapshot.params).subscribe((res: any) => {
        this.isApiCallInProgress = false;
        this.paymentDetails = res.data;
        this.paymentDetails.fullName = `${this.paymentDetails.userId.firstName} ${this.paymentDetails.userId.lastName}`;
        this.paymentDetails.validity = this.paymentDetails.isExpire ? 'EXPIRED' : 'ACTIVE';
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([PAYMENTS]);
        }
      })
    );
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
