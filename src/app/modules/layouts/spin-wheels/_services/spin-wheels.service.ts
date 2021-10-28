import { Injectable } from '@angular/core';
import { SPIN_WHEEL_API, SPIN_WHEEL_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class SpinWheelsService {
  constructor(private _http: HttpService) { }

  public getSpinWheelList(query) {
    return this._http.get(`admin/${SPIN_WHEEL_API}`, query);
  }

  public addSpinWheel(body) {
    return this._http.post(SPIN_WHEEL_API, body);
  }

  public getSpinWheelDetail(query) {
    return this._http.get(SPIN_WHEEL_DETAIL_API, query);
  }

  public updateSpinWheel(body) {
    return this._http.put(SPIN_WHEEL_API, body);
  }

  public deleteSpinWheel(query) {
    return this._http.delete(SPIN_WHEEL_API, query);
  }
}
