import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { ARTICLE_API, ARTICLE_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()

export class ArticleService {

  constructor(private _http: HttpService) { }

  getArticleList(query) {
    return this._http.get(ARTICLE_API, query);
  }

  addArticle(body) {
    return this._http.post(ARTICLE_API, body);
  }

  updateArticle(body) {
    return this._http.put(ARTICLE_API, body);
  }

  blockUnblockDeleteArticle(query) {
    return this._http.delete(ARTICLE_API, query);
  }

  getArticleDetail(query) {
    return this._http.get(ARTICLE_DETAIL_API, query);
  }

}
