import { Component, OnInit } from '@angular/core';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporateService } from '../../_service/corporate.service';
import { BC_CORPORATES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { EDIT, CORPORATES } from '../../../../../constants/routes';

@Component({
  selector: 'lv-corporate-detail',
  templateUrl: './corporate-detail.component.html',
  styleUrls: ['./corporate-detail.component.scss'],
  providers: [CorporateService]
})
export class CorporateDetailComponent implements OnInit {
  corporateDetails: Corporate.CorporateData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _corporate: CorporateService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CORPORATES_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['corporateId'])) {
      this.fetchCorporateDetails();
    }
  }

  fetchCorporateDetails() {
    this.isApiCallInProgress = true;
    let queryObj = {
      ...this._actRoute.snapshot.params
    }
    this.subscriptions.push(
      this._corporate.getCorporateDetail(queryObj).subscribe((res: Corporate.CorporateDetail) => {
        this.isApiCallInProgress = false;
        this.corporateDetails = res.data;
        if (this.corporateDetails.isExpired) {
          this.corporateDetails.distributionStatus = 'EXPIRED';
        } else {
          this.corporateDetails.distributionStatus = 'ACTIVE';
        }
        console.log(this.corporateDetails)
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CORPORATES]);
        }
      })
    );
  }

  openDescriptionBox(title: string, description: string) {
    if (description) {
      this._dialog.open(ShowDescriptionComponent, {
        data: {
          title: title,
          description: description
        }
      })
    }
  }

  editHandler() {
    this._router.navigate([`${CORPORATES}/${EDIT}`, this.corporateDetails._id]);
  }


  /**
    * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
    */
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}
