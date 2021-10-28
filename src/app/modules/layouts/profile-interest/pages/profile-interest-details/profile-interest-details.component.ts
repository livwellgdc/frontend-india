import { Component, OnInit } from '@angular/core';
import { PROFILE_INTERESTS } from '../../../../../constants/routes';
import { BC_PROFILE_INTERESTS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ProfileInterestService } from '../../_service/profile-interest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-profile-interest-details',
  templateUrl: './profile-interest-details.component.html',
  styleUrls: ['./profile-interest-details.component.scss'],
  providers: [ProfileInterestService]
})
export class ProfileInterestDetailsComponent implements OnInit {

  interestDetails: ProfileInterest.ProfileInterestData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _interest: ProfileInterestService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PROFILE_INTERESTS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['interestId'])) {
      this.fetchInterestDetails();
    }
  }

  fetchInterestDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._interest.getInterestDetails(this._actRoute.snapshot.params).subscribe((res: ProfileInterest.ProfileInterestDetail) => {
        this.isApiCallInProgress = false;
        this.interestDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([PROFILE_INTERESTS]);
        }
      })
    );
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
