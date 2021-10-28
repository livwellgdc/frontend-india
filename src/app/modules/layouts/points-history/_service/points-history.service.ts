import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { LWC_HISTORY_API, CLIENT_DROPDOWN_API, CORPORATE_DROPDOWN_API } from '../../../../constants/api-end-point';

@Injectable()
export class PointsHistoryService {
  constructor(private _http: HttpService) { }

  getLwcDistributionHistory(query: any) {
    return this._http.get(LWC_HISTORY_API, query);
  }

  getAllClients(query?: any) {
    return this._http.get(CLIENT_DROPDOWN_API, query);
  }

  getCorporates(query?: any) {
    return this._http.get(CORPORATE_DROPDOWN_API, query);
  }

}
