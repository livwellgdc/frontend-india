import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { SUB_ADMIN_API, SUB_ADMIN_DETAIL_API, SUB_ADMIN_LOGS_API } from '../../../../constants/api-end-point';

@Injectable()
export class SubAdminService {

  constructor(private _http: HttpService) { }

  getSubAdminList(query) {
    return this._http.get(SUB_ADMIN_API, query);
  }

  addSubAdmin(body) {
    return this._http.post(SUB_ADMIN_API, body);
  }

  updateSubAdmin(body) {
    return this._http.put(SUB_ADMIN_API, body);
  }

  blockUnblockDeleteSubAdmin(query) {
    return this._http.delete(SUB_ADMIN_API, query);
  }

  getSubAdminDetail(query) {
    return this._http.get(SUB_ADMIN_DETAIL_API, query);
  }

  getSubAdminActivities(query) {
    return this._http.get(SUB_ADMIN_LOGS_API, query);
  }

}
