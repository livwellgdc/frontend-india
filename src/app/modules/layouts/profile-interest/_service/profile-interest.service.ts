import { HttpService } from './../../../../services/http/http.service';
import { Injectable } from '@angular/core';
import { INTEREST_API, INTEREST_DETAILS_API } from '../../../../constants/api-end-point';

@Injectable()
export class ProfileInterestService {

  constructor(private _http: HttpService) { }

  getInterests(query: any) {
    return this._http.get(INTEREST_API, query);
  }

  addInterest(body: any) {
    return this._http.post(INTEREST_API, body);
  }

  updateInterest(body: any) {
    return this._http.put(INTEREST_API, body);
  }

  deleteInterest(query: any) {
    return this._http.delete(INTEREST_API, query);
  }

  getInterestDetails(query: any) {
    return this._http.get(INTEREST_DETAILS_API, query);
  }

}
