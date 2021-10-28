import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { GROUP_API, GROUP_DETAIL_API, GROUP_PARTICIPANT_USERS_API } from '../../../../constants/api-end-point';

@Injectable()
export class GroupService {

  constructor(private _http: HttpService) { }

  getGroupList(query) {
    return this._http.get(GROUP_API, query);
  }

  addGroup(body) {
    return this._http.post(GROUP_API, body);
  }

  updateGroup(body) {
    return this._http.put(GROUP_API, body);
  }

  deleteGroup(query) {
    return this._http.delete(GROUP_API, query);
  }

  getGroupDetail(query) {
    return this._http.get(GROUP_DETAIL_API, query);
  }

  getGroupParticipantUsers(query) {
    return this._http.get(GROUP_PARTICIPANT_USERS_API, query);
  }

}
