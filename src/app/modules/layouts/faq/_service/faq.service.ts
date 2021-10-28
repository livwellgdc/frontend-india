import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { FAQ_API, FAQ_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()

export class FaqService {

  constructor(private _http: HttpService) { }

  getFaqList(query?: any) {
    return this._http.get(FAQ_API, query);
  }

  getFaqDetails(query: any) {
    return this._http.get(FAQ_DETAIL_API, query);
  }

  addFaq(body: any) {
    return this._http.post(FAQ_API, body);
  }

  updateFaq(body: any) {
    return this._http.put(FAQ_API, body);
  }

  deleteFaq(body: any) {
    return this._http.delete(FAQ_API, body);
  }

}
