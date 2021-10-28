import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { CHALLENGE_API, CHALLENGE_DETAIL_API, CHALLENGE_PARTICIPANT_USERS_API, CHALLENGE_BADGES_API } from '../../../../constants/api-end-point';

@Injectable()

export class ChallengeService {

  constructor(private _http: HttpService) { }

  getChallengeList(query) {
    return this._http.get(CHALLENGE_API, query);
  }

  addChallenge(body) {
    return this._http.post(CHALLENGE_API, body);
  }

  updateChallenge(body) {
    return this._http.put(CHALLENGE_API, body);
  }

  blockUnblockDeleteChallenge(query) {
    return this._http.delete(CHALLENGE_API, query);
  }

  getChallengeDetail(query) {
    return this._http.get(CHALLENGE_DETAIL_API, query);
  }

  getBadgesForChallenge(query?) {
    return this._http.get(CHALLENGE_BADGES_API, query);
  }

  getChallengeParticipantUsers(query) {
    return this._http.get(CHALLENGE_PARTICIPANT_USERS_API, query);
  }

}
