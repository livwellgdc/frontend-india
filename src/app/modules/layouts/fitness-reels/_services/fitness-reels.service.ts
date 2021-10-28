import { Injectable } from '@angular/core';
import { FITNESS_REELS_API, FITNESS_REELS_CATEGORY_API, FITNESS_REELS_DETAIL_API, } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()
export class FitnessReelsService {

  constructor(private _http: HttpService) { }

  public getfitnessReelsList(query) {
    return this._http.get(FITNESS_REELS_API, query);
  }

  public getReelsDetail(query) {
    return this._http.get(FITNESS_REELS_DETAIL_API, query);
  }

  public updatefitnessReels(body) {
    return this._http.put(FITNESS_REELS_API, body);
  }

  public updatefitnessReelsCategory(body) {
    return this._http.put(FITNESS_REELS_CATEGORY_API, body);
  }

  public deleteReels(query) {
    return this._http.delete(FITNESS_REELS_API, query);
  }
}
function REFITNESS_REELS_APIELS_API(REFITNESS_REELS_APIELS_API: any, query: any) {
  throw new Error('Function not implemented.');
}

