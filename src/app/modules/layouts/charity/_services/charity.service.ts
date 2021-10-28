import { Injectable } from '@angular/core';
import { CHARITY_API, CHARITY_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private _http: HttpService) { }

  public getCharityList(query) {
    return this._http.get(CHARITY_API, query);
  }

  public addCharity(body) {
    return this._http.post(CHARITY_API, body);
  }

  public getCharityDetail(query) {
    return this._http.get(CHARITY_DETAIL_API, query);
  }

  public updateCharity(body) {
    return this._http.put(CHARITY_API, body);
  }

  public deleteCharity(query) {
    return this._http.delete(CHARITY_API, query);
  }
}
