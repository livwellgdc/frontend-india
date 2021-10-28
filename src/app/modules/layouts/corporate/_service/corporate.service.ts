import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CORPORATE_DETAIL_API, CORPORATE_API } from '../../../../constants/api-end-point';

@Injectable()
export class CorporateService {

  constructor(private _http: HttpService) { }

  getCorporateList(query) {
    return this._http.get(CORPORATE_API, query);
  }

  addCorporate(body) {
    return this._http.post(CORPORATE_API, body);
  }

  updateCorporate(body) {
    return this._http.put(CORPORATE_API, body);
  }

  blockUnblockCorporate(query) {
    return this._http.delete(CORPORATE_API, query);
  }

  getCorporateDetail(query) {
    return this._http.get(CORPORATE_DETAIL_API, query);
  }

}
