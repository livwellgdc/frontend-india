import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { USERS_API, BLOCK_UNBLOCK_USER_API, USER_DETAILS_API, BADGES_EARNED_API, BLOCKCHAIN_CHALLENGE_DATA_API, BLOCKCHAIN_HEALTH_DATA_API } from '../../../../constants/api-end-point';

@Injectable()
export class UserService {

  constructor(private _http: HttpService) { }

  getUsers(query: any) {
    return this._http.get(USERS_API, query);
  }

  getUserDetails(query: any) {
    return this._http.get(USER_DETAILS_API, query);
  }

  blockUnblockUser(body: any) {
    return this._http.put(BLOCK_UNBLOCK_USER_API, body);
  }

  getEarnedBadges(query) {
    return this._http.get(BADGES_EARNED_API, query);
  }

  getBlockchainChallengeData(query) {
    return this._http.get(BLOCKCHAIN_CHALLENGE_DATA_API, query);
  }

  getBlockchainHealthData(query) {
    return this._http.get(BLOCKCHAIN_HEALTH_DATA_API, query);
  }

}
