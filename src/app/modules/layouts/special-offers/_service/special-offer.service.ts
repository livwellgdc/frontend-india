import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { OFFER_DETAIL_API, SPECIAL_OFFERS_API } from '../../../../constants/api-end-point';

@Injectable()
export class SpecialOfferService {
  constructor(private _http: HttpService) { }

  getOfferList(query) {
    return this._http.get(SPECIAL_OFFERS_API, query);
  }

  addOffer(body) {
    return this._http.post(SPECIAL_OFFERS_API, body);
  }

  updateOffer(body) {
    return this._http.put(SPECIAL_OFFERS_API, body);
  }

  blockUnblockDeleteOffer(query) {
    return this._http.delete(SPECIAL_OFFERS_API, query);
  }

  getOfferDetail(query) {
    return this._http.get(OFFER_DETAIL_API, query);
  }

}
