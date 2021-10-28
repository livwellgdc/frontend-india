import { AGE_CALCULATOR } from './../../../../../constants/routes';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { AgeCalculatorService } from '../../_service/age-calculator.service';
import { BC_AGE_CALCULATOR } from '../../../../../constants/breadcrumb-routes';
import { Router } from '@angular/router';
import { EDIT } from '../../../../../constants/routes';

@Component({
  selector: 'lv-age-cal-questions',
  templateUrl: './age-cal-questions.component.html',
  styleUrls: ['./age-cal-questions.component.scss'],
  providers: [AgeCalculatorService]
})
export class AgeCalQuestionsComponent implements OnInit {
  isApiCallInProgress = false;
  questionList = [];

  constructor(
    private _bc: BreadcrumbService,
    private _calcultor: AgeCalculatorService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_AGE_CALCULATOR);
    this.getAllAgeQuestions();
  }

  getAllAgeQuestions() {
    this.isApiCallInProgress = true;
    this._calcultor.getQuestionList().subscribe(res => {
      this.isApiCallInProgress = false;
      if (res && res.data) {
        this.questionList = res.data;
      }
    }, (error) => {
      this.isApiCallInProgress = false;
    })
  }

  onClickEdit(singleQues: any) {
    this._router.navigate([`${AGE_CALCULATOR}/${EDIT}`, singleQues._id]);
  }

}
