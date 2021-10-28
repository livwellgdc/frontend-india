import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { HEALTH_SCORE_API } from '../../../../constants/api-end-point';

@Injectable()
export class HealthScoreService {

  constructor(private _http: HttpService) { }

  updateHealthScoreCriteria(body: any) {
    return this._http.put(HEALTH_SCORE_API, body);
  }

}
