import { Injectable } from '@angular/core';
import { HttpService } from '../../../../services/http/http.service';
import { AGE_CALCULATOR_API, AGE_CALCULATOR_DETAIL_API } from '../../../../constants/api-end-point';

@Injectable()
export class AgeCalculatorService {

  constructor(private _http: HttpService) { }

  getQuestionList(query?) {
    return this._http.get(AGE_CALCULATOR_API, query);
  }

  updateQuestions(body) {
    return this._http.put(AGE_CALCULATOR_API, body);
  }

  getQuestionDetail(query) {
    return this._http.get(AGE_CALCULATOR_DETAIL_API, query);
  }

}
