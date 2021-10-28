import { Component, OnInit } from '@angular/core';
import { PerStepLwcService } from '../../_service/per-step-lwc.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../../../../../services/storage/storage.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { LIMIT } from '../../../../../constants/validator';
import { BC_PER_STEP_LWC } from '../../../../../constants/breadcrumb-routes';

@Component({
  selector: 'lv-manage-per-step-lwc',
  templateUrl: './manage-per-step-lwc.component.html',
  styleUrls: ['./manage-per-step-lwc.component.scss'],
  providers: [PerStepLwcService]
})
export class ManagePerStepLwcComponent implements OnInit {
  pointsDistributionForm: FormGroup;
  _limit = LIMIT;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _lwc: PerStepLwcService,
    private _storage: StorageService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PER_STEP_LWC);
    this.createForm();
  }

  createForm() {
    this.pointsDistributionForm = this._fb.group({
      lwcPerStep: [this._storage.adminDetail.lwcPerStep ? this._storage.adminDetail.lwcPerStep : 0]
    })
  }

  get f() { return this.pointsDistributionForm.value } //return form controls

  updatePointsHandler() {
    if (this.pointsDistributionForm.valid && this.pointsDistributionForm.dirty) {
      let formValue = this.pointsDistributionForm.value;
      formValue['lwcPerStep'] = Number(formValue.lwcPerStep);
      this._lwc.updateLwcDistribution(formValue).subscribe(response => {
        this._storage.adminDetail.lwcPerStep = formValue.lwcPerStep;
        this._toast.success(response.message);
      });
    }
  }

}
