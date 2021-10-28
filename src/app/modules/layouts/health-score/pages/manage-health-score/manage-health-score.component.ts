import { Component, OnInit } from '@angular/core';
import { LIMIT } from '../../../../../constants/validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_HEALTH_SCORE } from '../../../../../constants/breadcrumb-routes';
import { HealthScoreService } from '../../_service/health-score.service';
import { HEALTH_SCORE_ERROR_MESSAGES } from '../../../../../constants/messages';

@Component({
  selector: 'lv-manage-health-score',
  templateUrl: './manage-health-score.component.html',
  styleUrls: ['./manage-health-score.component.scss'],
  providers: [HealthScoreService]
})
export class ManageHealthScoreComponent implements OnInit {
  healthScoreForm: FormGroup;
  _limit = LIMIT;
  totalScore = 0;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _healthScore: HealthScoreService,
    private _storage: StorageService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_HEALTH_SCORE);
    this.createForm();
    this.calculateTotalScore(this.getTotal());
  }

  createForm() {
    this.healthScoreForm = this._fb.group({
      chs: this._fb.group({
        steps: [this._storage.adminDetail.chs && this._storage.adminDetail.chs.steps ? this._storage.adminDetail.chs.steps : 0, [Validators.max(this._limit.MAX_DISCOUNT_VALUE)]],
        kms: [this._storage.adminDetail.chs && this._storage.adminDetail.chs.kms ? this._storage.adminDetail.chs.kms : 0, [Validators.max(this._limit.MAX_DISCOUNT_VALUE)]],
        challenges: [this._storage.adminDetail.chs && this._storage.adminDetail.chs.challenges ? this._storage.adminDetail.chs.challenges : 0, [Validators.max(this._limit.MAX_DISCOUNT_VALUE)]],
        bmi: [this._storage.adminDetail.chs && this._storage.adminDetail.chs.bmi ? this._storage.adminDetail.chs.bmi : 0, [Validators.max(this._limit.MAX_DISCOUNT_VALUE)]],
        points: [this._storage.adminDetail.chs && this._storage.adminDetail.chs.points ? this._storage.adminDetail.chs.points : 0, [Validators.max(this._limit.MAX_DISCOUNT_VALUE)]]
      })
    })
  }

  get f() { return this.healthScoreForm.value } //return form controls

  calculateTotalScore(predefinedTotal?) {
    if (predefinedTotal) {
      this.totalScore = predefinedTotal;
    } else {
      if (this.healthScoreForm.valid && this.healthScoreForm.dirty) {
        this.totalScore = this.getTotal();
      }
    }
  }

  getTotal() {
    let formValue = this.healthScoreForm.value;
    let total = 0;
    for (const prop in formValue.chs) {
      formValue.chs[prop] = Number(formValue.chs[prop]);
      total = total + formValue.chs[prop];
    }
    return total;
  }

  updateScoreCriteriaHandler() {
    if (this.healthScoreForm.valid && this.healthScoreForm.dirty) {
      let formValue = this.healthScoreForm.value;
      for (const prop in formValue.chs) {
        formValue.chs[prop] = Number(formValue.chs[prop]);
      }
      if (this.totalScore > 100) {
        this._toast.error(HEALTH_SCORE_ERROR_MESSAGES.GREATER_THAN_100);
        return;
      }
      if (this.totalScore < 100) {
        this._toast.error(HEALTH_SCORE_ERROR_MESSAGES.LESS_THAN_100);
        return;
      }
      this._healthScore.updateHealthScoreCriteria(formValue).subscribe(response => {
        this._storage.adminDetail.chs = formValue.chs;
        this._toast.success(response.message);
      });
    }
  }

}
