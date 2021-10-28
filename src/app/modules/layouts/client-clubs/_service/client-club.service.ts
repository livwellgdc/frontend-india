import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CLIENT_CLUB_API, CLIENT_CLUB_DETAIL_API, POINTS_DISTRIBUTION_API } from '../../../../constants/api-end-point';

@Injectable()
export class ClientClubService {
  constructor(private _http: HttpService) { }

  getClientClubList(query) {
    return this._http.get(CLIENT_CLUB_API, query);
  }

  addClientClub(data) {
    return this._http.post(CLIENT_CLUB_API, data);
  }

  updateClientClub(data) {
    return this._http.put(CLIENT_CLUB_API, data);
  }

  deleteClientClub(query) {
    return this._http.delete(CLIENT_CLUB_API, query);
  }

  getClientClubDetail(query) {
    return this._http.get(CLIENT_CLUB_DETAIL_API, query);
  }

  getPointsDistributionHistory(query) {
    return this._http.get(POINTS_DISTRIBUTION_API, query);
  }

}
