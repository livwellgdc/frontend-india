import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { LWC_API } from '../../../../constants/api-end-point';

@Injectable()
export class PointsDistributionService {
  constructor(private _http: HttpService) { }

  updateLwcDistribution(body: any) {
    return this._http.put(LWC_API, body);
  }

}
