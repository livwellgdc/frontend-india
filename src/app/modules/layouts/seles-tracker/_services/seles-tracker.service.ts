import { Injectable } from '@angular/core';
import { REFERRER_TRACK_LIST_API, SELSES_TRACK_API, SELSES_TRACK_LIST_API, SELSES_TRACK_MAIL_LIST_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class SelesTrackerService {

  constructor(private _http: HttpService) { }

  public assignReferralCode(body) {
    return this._http.post(SELSES_TRACK_API, body)
  }

  public getAssigedList(params) {
    return this._http.get(SELSES_TRACK_API, params);
  }

  public getSalesTrackList(params) {
    return this._http.get(SELSES_TRACK_LIST_API, params);
  }

  public getSalesTrackMailList() {
    return this._http.get(SELSES_TRACK_MAIL_LIST_API);
  }

  public getReferrerTrackList(params) {
    return this._http.get(REFERRER_TRACK_LIST_API, params);
  }
}
