import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { ADMIN_INFO_API, CHANGE_PASSWORD_API } from '../../../../constants/api-end-point';

@Injectable()

export class AdminService {

  constructor(private _http: HttpService) { }


  updateProfile(body) {
    return this._http.put(ADMIN_INFO_API, body);
  }

  changePassword(body) {
    return this._http.post(CHANGE_PASSWORD_API, body);
  }


}
