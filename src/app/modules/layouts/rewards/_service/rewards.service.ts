import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { REWARD_DETAIL_API, REWARD_API, REWARD_REDEEM_API, REWARD_DEALSOFTHEDAY_API } from '../../../../constants/api-end-point';

@Injectable()

export class RewardsService {

  constructor(private _http: HttpService) { }

  getRewardList(query) {
    return this._http.get(REWARD_API, query);
  }

  addReward(body) {
    return this._http.post(REWARD_API, body);
  }

  updateReward(body) {
    return this._http.put(REWARD_API, body);
  }

  blockUnblockDeleteReward(query) {
    return this._http.delete(REWARD_API, query);
  }

  getRewardDetail(query) {
    return this._http.get(REWARD_DETAIL_API, query);
  }

  getRewardRedeemedUsers(query) {
    return this._http.get(REWARD_REDEEM_API, query);
  }

  updateDealsOfTheDay(body) {
    return this._http.put(REWARD_DEALSOFTHEDAY_API, body);
  }

}
