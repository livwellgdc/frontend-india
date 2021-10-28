import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _storage: StorageService
  ) { }

  authorization() {
    const token = this._storage.token;
    const auth = {
      'Authorization': token ? 'Bearer ' + token : environment.FINGER_PRINT,
      "api_key": environment.API_KEY,
      "platform": '' + this._storage.deviceDetail(3),
      "timezone": '' + this._storage.deviceDetail(4),
      "language": 'en',
      'Content-Type': "application/json",
      'Access-Control-Allow-Origin': '*',
    }
    return auth;
  }

}
