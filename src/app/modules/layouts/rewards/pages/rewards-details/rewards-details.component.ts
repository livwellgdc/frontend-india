import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { REWARDS, EDIT } from '../../../../../constants/routes';
import { BC_REWARDS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { RewardsService } from '../../_service/rewards.service';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { Subscription } from 'rxjs';
import { ShowCouponCodesComponent } from '../../../../../components/show-coupon-codes/show-coupon-codes.component';
import { Pagination } from '../../../../../constants/paginator';
import { REWARD_REDEEM_REPORT_API } from '../../../../../constants/api-end-point';

@Component({
  selector: 'lv-rewards-details',
  templateUrl: './rewards-details.component.html',
  styleUrls: ['./rewards-details.component.scss']
})
export class RewardsDetailsComponent extends Pagination implements OnInit, OnDestroy {
  rewardDetails: Reward.RewardData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  rewardId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _reward: RewardsService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_REWARDS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.REWARDS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['rewardId'])) {
      this.rewardId = this._actRoute.snapshot.params['rewardId'];
      this.fetchRewardDetails();
    }
  }

  fetchRewardDetails() {
    this.isApiCallInProgress = true;
    let queryObj = {
      rewardType: 'CUSTOM_REWARD',
      ...this._actRoute.snapshot.params
    }
    this.subscriptions.push(
      this._reward.getRewardDetail(queryObj).subscribe((res: Reward.RewardDetail) => {
        this.isApiCallInProgress = false;
        this.rewardDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([REWARDS]);
        }
      })
    );
  }

  openCodeBox() {
    if (this.rewardDetails.couponCodes.length > 1) {
      this._dialog.open(ShowCouponCodesComponent, {
        data: {
          couponCodeArray: this.rewardDetails.couponCodes
        }
      })
    }
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

  copyLink(link: string) {
    this._common.copyToClipboard(link);
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${REWARDS}/${EDIT}`, this.rewardDetails._id]);
    }
  }

  downloadCouponCodes(codes) {
    this._common.downloadInCsvFormat(codes, ['Code']);
  }

  exportList() {
    this._common.exportReports(REWARD_REDEEM_REPORT_API, []);
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
