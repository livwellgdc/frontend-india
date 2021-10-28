import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { PER_STEP_LWC_API } from '../../../../constants/api-end-point';

@Injectable()
export class PerStepLwcService {

  constructor(private _http: HttpService) { }

  updateLwcDistribution(body: any) {
    return this._http.put(PER_STEP_LWC_API, body);
  }

}
