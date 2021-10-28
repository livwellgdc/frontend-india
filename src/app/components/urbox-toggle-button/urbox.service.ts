import { Injectable } from '@angular/core';
import { URBOX_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class UrboxService {

  constructor(private _http: HttpService) { };

  public getUrBoxStatus() {
    return this._http.get(URBOX_API);
  }

  public updateUrboxStatus(body: any) {
    return this._http.put(URBOX_API, body);
  }
}
