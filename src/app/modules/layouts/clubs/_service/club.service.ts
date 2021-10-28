import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CLUB_API, CLUB_DETAIL_API, PARENT_CLUB_API } from '../../../../constants/api-end-point';

@Injectable()
export class ClubService {

  constructor(private _http: HttpService) { }

  getClubList(query) {
    return this._http.get(CLUB_API, query);
  }

  getClientClubs(query?) {
    return this._http.get(PARENT_CLUB_API, query);
  }

  addClub(data) {
    return this._http.post(CLUB_API, data);
  }

  updateClub(data) {
    return this._http.put(CLUB_API, data);
  }

  blockUnblockDeleteClub(query) {
    return this._http.delete(CLUB_API, query);
  }

  getClubDetail(query) {
    return this._http.get(CLUB_DETAIL_API, query);
  }
}
