import { Injectable } from '@angular/core';
import { LOGIN_API, LOGOUT_API, FORGOT_PASSWORD_API, RESET_PASSWORD_API } from '../../../constants/api-end-point';
import { HttpService } from '../../../services/http/http.service';

@Injectable()

export class AccountService {

  constructor(private _http: HttpService) { }

  logIn(body: any) {
    return this._http.post(LOGIN_API, body);
  }

  logOut(body: any) {
    return this._http.post(LOGOUT_API, body);
  }

  forgotPassword(body: any) {
    return this._http.post(FORGOT_PASSWORD_API, body);
  }

  resetPassword(body: any) {
    return this._http.post(RESET_PASSWORD_API, body);
  }

}
