import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_POINTS_DISTRIBUTION } from '../../../../../constants/breadcrumb-routes';
import { PointsDistributionService } from '../../_service/points-distribution.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIMIT } from '../../../../../constants/validator';
import { StorageService } from '../../../../../services/storage/storage.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';

@Component({
  selector: 'lv-manage-points',
  templateUrl: './manage-points.component.html',
  styleUrls: ['./manage-points.component.scss'],
  providers: [PointsDistributionService]
})
export class ManagePointsComponent implements OnInit {
  pointsDistributionForm: FormGroup;
  _limit = LIMIT;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _lwc: PointsDistributionService,
    private _storage: StorageService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_POINTS_DISTRIBUTION);
    this.createForm();
  }

  createForm() {
    this.pointsDistributionForm = this._fb.group({
      adsPoint: [this._storage.adminDetail.adsPoint ? this._storage.adminDetail.adsPoint : 0]
    })
  }

  get f() { return this.pointsDistributionForm.value } //return form controls

  updatePointsHandler() {
    if (this.pointsDistributionForm.valid && this.pointsDistributionForm.dirty) {
      let formValue = this.pointsDistributionForm.value;
      formValue['adsPoint'] = Number(formValue.adsPoint);
      this._lwc.updateLwcDistribution(formValue).subscribe(response => {
        this._storage.adminDetail.adsPoint = formValue.adsPoint;
        this._toast.success(response.message);
      });
    }
  }

}
