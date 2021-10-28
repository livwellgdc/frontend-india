import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengeService } from '../../_service/challenge.service';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BreadcrumbService } from './../../../../../components/breadcrumb/breadcrumb.service';
import { CHALLENGES } from './../../../../../constants/routes';
import { BC_CHALLENGES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { EDIT } from '../../../../../constants/routes';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { Subscription } from 'rxjs';
import { formatChallengeType } from '../../../../../constants/helper';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-challenges-details',
  templateUrl: './challenges-details.component.html',
  styleUrls: ['./challenges-details.component.scss']
})
export class ChallengesDetailsComponent extends Pagination implements OnInit, OnDestroy {
  challengeDetails: Challenge.ChallengeData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  challengeId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _challenge: ChallengeService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CHALLENGES_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.CHALLENGES);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['challengeId'])) {
      this.challengeId = this._actRoute.snapshot.params['challengeId'];
      this.fetchChallengeDetails();
    }
  }

  fetchChallengeDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._challenge.getChallengeDetail(this._actRoute.snapshot.params).subscribe((res: Challenge.ChallengeDetail) => {
        this.isApiCallInProgress = false;
        this.challengeDetails = res.data;
        this.challengeDetails.type = formatChallengeType(this.challengeDetails.type);
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CHALLENGES]);
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
      this._router.navigate([`${CHALLENGES}/${EDIT}`, this.challengeDetails._id]);
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
