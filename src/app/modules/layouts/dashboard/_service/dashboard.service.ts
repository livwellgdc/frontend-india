import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { DASHBOARD_API, CORPORATE_DROPDOWN_API } from '../../../../constants/api-end-point';

@Injectable()
export class DashboardService {

  constructor(private _http: HttpService) { }

  getDashboardData(query?) {
    return this._http.get(DASHBOARD_API, query);
  }

  getCorporates(query?: any) {
    return this._http.get(CORPORATE_DROPDOWN_API, query);
  }

}
