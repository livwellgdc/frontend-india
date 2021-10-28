import { Injectable } from '@angular/core';
import { SUBSCRIPTION_FETURES_API, SUBSCRIPTION_FETURES_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class SubscriptionFeatureService {

  constructor(private _http: HttpService) { }

  public getFeaturesList(query) {
    return this._http.get(SUBSCRIPTION_FETURES_API, query);
  }

  public addFeature(body) {
    return this._http.post(SUBSCRIPTION_FETURES_API, body);
  }

  public getFeatureDetail(query) {
    return this._http.get(SUBSCRIPTION_FETURES_DETAIL_API, query);
  }

  public updateFeatures(body) {
    return this._http.put(SUBSCRIPTION_FETURES_API, body);
  }

  public deleteFeature(query) {
    return this._http.delete(SUBSCRIPTION_FETURES_API, query);
  }
}
