import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { PROMO_CODE_USER_API, PROMO_CODE_REWARD_API, PROMO_CODE_APPLY_API } from '../../../../constants/api-end-point';

@Injectable()
export class PromoService {

  constructor(private _http: HttpService) { }

  getUsersForPromoCodes(query: any) {
    return this._http.get(PROMO_CODE_USER_API, query);
  }

  getRewrdsForPromoCodes(query: any) {
    return this._http.get(PROMO_CODE_REWARD_API, query);
  }

  distributePromoCodes(body: any) {
    return this._http.post(PROMO_CODE_APPLY_API, body);
  }

}
