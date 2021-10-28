import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { PAYMENT_API, PAYMENT_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class PaymentService {

  constructor(private _http: HttpService) { }

  getPaymentList(query?) {
    return this._http.get(PAYMENT_API, query);
  }

  getPaymentDetail(query) {
    return this._http.get(PAYMENT_DETAIL_API, query);
  }

}
