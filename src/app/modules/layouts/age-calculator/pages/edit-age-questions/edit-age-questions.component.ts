import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_AGE_CALCULATOR_EDIT } from '../../../../../constants/breadcrumb-routes';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { AGE_ERROR_MESSAGES } from '../../../../../constants/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeCalculatorService } from '../../_service/age-calculator.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { AGE_CALCULATOR } from '../../../../../constants/routes';
import { Location } from '@angular/common';

@Component({
  selector: 'lv-edit-age-questions',
  templateUrl: './edit-age-questions.component.html',
  styleUrls: ['./edit-age-questions.component.scss'],
  providers: [AgeCalculatorService]
})
export class EditAgeQuestionsComponent implements OnInit {

  ageLogicForm: FormGroup;
  _limit = LIMIT;
  errMsg = AGE_ERROR_MESSAGES;
  questionDetails: any;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _calculator: AgeCalculatorService,
    private _common: CommonService,
    private _toast: ToastService,
    private _loc: Location,
    private _router: Router
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_AGE_CALCULATOR_EDIT);
    this.createForm();
    if (this._common.isValidId(this._actRoute.snapshot.params['questionId'])) {
      this.getQuestionDetails();
    }
  }

  createForm() {
    this.ageLogicForm = this._fb.group({
      question: this._fb.group({
        en: [''],
        vi: ['']
      }),
      answers: this._fb.array([])
    })
  }

  get f() { return this.ageLogicForm.controls } // return sort form controls

  private _createMultipleAnswers(data?: any): FormGroup {
    return this._fb.group({
      position: [data ? data.position : ''],
      percentage: [data ? data.percentage : null],
      value: this._fb.group({
        en: [data ? data.value.en : ''],
        vi: [data ? data.value.vi : '']
      }),
      description: this._fb.group({
        en: [data && data.description && data.description.en ? data.description.en : ''],
        vi: [data && data.description && data.description.vi ? data.description.vi : '']
      }),
    });
  }

  get answers() {
    return this.ageLogicForm.get("answers") as FormArray;
  }

  addAnswers(data?: any) {
    this.answers.push(this._createMultipleAnswers(data));
  }

  getQuestionDetails() {
    this._calculator.getQuestionDetail({ questionId: this._actRoute.snapshot.params['questionId'] }).subscribe(res => {
      if (res && res.statusCode == 200) {
        this.questionDetails = res.data;
        this.ageLogicForm.patchValue(this.questionDetails);
        if (this.questionDetails.answers.length > 0) {
          this.questionDetails.answers.forEach(answer => {
            this.addAnswers(answer);
          });
        }
      }
    })
  }

  ageLogicHandler() {
    this.checkValidation();
    if (this.ageLogicForm.valid) {
      let formValue = this.ageLogicForm.value;
      formValue.answers.forEach(element => {
        if (this.questionDetails.type == 'SINGLE') {
          element.percentage = Number(element.percentage);
        } else {
          delete element.percentage;
        }
        if (!element.description.en) delete element.description.en;
        if (!element.description.vi) delete element.description.vi;
      })
      if (this.ageLogicForm.dirty) {
        this.updateAgeQuestions(formValue);
      } else {
        this.navigate();
      }

    }
  }

  updateAgeQuestions(formValue: any) {
    formValue['questionId'] = this._actRoute.snapshot.params['questionId'];
    this._calculator.updateQuestions(formValue).subscribe(res => {
      if (res.statusCode === 202) {
        this.navigate(res.message);
      }
    })
  }

  checkValidation() {

    this.ageLogicForm.value["answers"].forEach((control, index) => {
      if (this.questionDetails.type == 'SINGLE' && control.percentage == null) {
        this.answers["controls"][index]["controls"].percentage.setValidators([Validators.required, Validators.max(this._limit.MAX_DISCOUNT_VALUE)]);
      } else {
        this.answers["controls"][index]["controls"].percentage.setErrors(null);
      }
      this.answers["controls"][index]["controls"].percentage.updateValueAndValidity();
    });

  }

  cancelHandler() {
    this._loc.back();
  }

  navigate(mssg?: string) {
    if (mssg) {
      this._toast.success(mssg);
    }
    this._router.navigate([AGE_CALCULATOR]);
  }

}
