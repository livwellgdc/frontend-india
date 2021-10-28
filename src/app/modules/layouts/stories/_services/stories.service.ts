import { Injectable } from '@angular/core';
import { STORY_API, STORY_DETAIL_API } from 'src/app/constants/api-end-point';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable()

export class StoriesService {

  constructor(private _http: HttpService) { }

  public getStoryList(query) {
    return this._http.get(STORY_API, query);
  }

  public addStory(body) {
    return this._http.post(STORY_API, body);
  }

  public getStoryDetail(query) {
    return this._http.get(STORY_DETAIL_API, query);
  }

  public updateStory(body) {
    return this._http.put(STORY_API, body);
  }

  public deleteStory(query) {
    return this._http.delete(STORY_API, query);
  }
}
