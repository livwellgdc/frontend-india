import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { BADGES, EDIT } from '../../../../../constants/routes';
import { BC_BADGES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeService } from '../../_service/badge.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Subscription } from 'rxjs';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { MatDialog } from '@angular/material';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-badges-details',
  templateUrl: './badges-details.component.html',
  styleUrls: ['./badges-details.component.scss'],
  providers: [BadgeService]
})
export class BadgesDetailsComponent extends Pagination implements OnInit, OnDestroy {
  badgeDetails: Badge.BadgeData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _badge: BadgeService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BADGES_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.BADGES);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['badgeId'])) {
      this.fetchBadgeDetails();
    }
  }

  fetchBadgeDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._badge.getBadgeDetail(this._actRoute.snapshot.params).subscribe((res: Badge.BadgeDetail) => {
        this.isApiCallInProgress = false;
        this.badgeDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([BADGES]);
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
    if (!this.permissionClass) {
      this._router.navigate([`${BADGES}/${EDIT}`, this.badgeDetails._id]);
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
