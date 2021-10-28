import { Component, OnInit } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BannerService } from '../../_service/banner.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_BANNERS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { BANNERS, EDIT } from '../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-banners-details',
  templateUrl: './banners-details.component.html',
  styleUrls: ['./banners-details.component.scss'],
  providers: [BannerService]
})
export class BannersDetailsComponent extends Pagination implements OnInit {
  bannerDetails: Banner.BannerData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _banner: BannerService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BANNERS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.BANNERS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['bannerId'])) {
      this.fetchBannerDetails();
    }
  }

  fetchBannerDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._banner.getBannerDetail(this._actRoute.snapshot.params).subscribe((res: Banner.BannerDetail) => {
        this.isApiCallInProgress = false;
        this.bannerDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([BANNERS]);
        }
      })
    );
  }

  copyLink(link: string) {
    this._common.copyToClipboard(link);
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${BANNERS}/${EDIT}`, this.bannerDetails._id]);
    }
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
