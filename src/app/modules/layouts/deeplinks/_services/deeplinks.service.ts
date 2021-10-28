import { Injectable } from '@angular/core';
import { DEEPLINKS_DETAIL_API, DEPPLINKS_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class DeeplinksService {

  constructor(private _http: HttpService) { }

  public getDeeplinkList(query) {
    return this._http.get(DEPPLINKS_API, query);
  }

  public addDeeplink(body) {
    return this._http.post(DEPPLINKS_API, body);
  }

  public getDeeplinkDetail(query) {
    return this._http.get(DEEPLINKS_DETAIL_API, query);
  }

  public updateDeeplink(body) {
    return this._http.put(DEPPLINKS_API, body);
  }

  public deleteDeeplink(query) {
    return this._http.delete(DEPPLINKS_API, query);
  }
}
