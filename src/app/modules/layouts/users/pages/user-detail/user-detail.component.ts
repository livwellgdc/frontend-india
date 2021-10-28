import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { AUDIT_LOG, AUDIT_LOG_HEALTH_HISTORY, USERS } from '../../../../../constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Pagination } from '../../../../../constants/paginator';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { UserService } from '../../_service/user.service';
import { CommonService } from '../../../../../services/common/common.service';
import { encryptEmailPhone } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends Pagination implements OnInit, OnDestroy {
  userDetails: User.UserData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  userId: string;
  subscriptions: Subscription[] = [];
  public isPermission: boolean = false;
  constructor(
    private _actRoute: ActivatedRoute,
    private _user: UserService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.validateIdAndFetchDetails();
    this.isPermission = this._common.viewPermissionHandler(SECTION_ID_OF.AUDIT_LOG);
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['userId'])) {
      this.userId = this._actRoute.snapshot.params['userId'];
      this.fetchUserDetails();
    }
  }

  fetchUserDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._user.getUserDetails(this._actRoute.snapshot.params).subscribe((res: User.UserDetail) => {
        this.isApiCallInProgress = false;
        this.userDetails = res.data;
        this.userDetails['email'] = encryptEmailPhone('EMAIL', this.userDetails.email);
        this.userDetails['mobileNo'] = encryptEmailPhone('PHONE', this.userDetails.mobileNo);
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([USERS]);
        }
      })
    );
  }


  public onShowActivity(userId): void {
      this._router.navigate([AUDIT_LOG, userId, AUDIT_LOG_HEALTH_HISTORY])
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
