import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { BADGE_API, BADGE_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()

export class BadgeService {

  constructor(private _http: HttpService) { }

  getBadgeList(query) {
    return this._http.get(BADGE_API, query);
  }

  addBadge(body) {
    return this._http.post(BADGE_API, body);
  }

  updateBadge(body) {
    return this._http.put(BADGE_API, body);
  }

  getBadgeDetail(query) {
    return this._http.get(BADGE_DETAIL_API, query);
  }

}
