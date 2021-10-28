import { Component, OnInit } from '@angular/core';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubAdminService } from '../../_service/sub-admin.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_SUB_ADMINS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { SUB_ADMINS, EDIT } from '../../../../../constants/routes';
import { MatDialog } from '@angular/material';
import { ShowPermissionsComponent } from './_components/show-permissions/show-permissions.component';

@Component({
  selector: 'lv-sub-admins-details',
  templateUrl: './sub-admins-details.component.html',
  styleUrls: ['./sub-admins-details.component.scss'],
  providers: [SubAdminService]
})
export class SubAdminsDetailsComponent implements OnInit {
  subAdminDetails: SubAdmin.SubAdminData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subAdminId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _subAdmin: SubAdminService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SUB_ADMINS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['subAdminId'])) {
      this.subAdminId = this._actRoute.snapshot.params['subAdminId'];
      this.fetchSubAdminDetails();
    }
  }

  fetchSubAdminDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._subAdmin.getSubAdminDetail(this._actRoute.snapshot.params).subscribe((res: SubAdmin.SubAdminDetail) => {
        this.isApiCallInProgress = false;
        this.subAdminDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([SUB_ADMINS]);
        }
      })
    );
  }

  openPermissionBox() {
    this._dialog.open(ShowPermissionsComponent, {
      data: {
        permission: this.subAdminDetails.permission
      }
    })
  }

  editHandler() {
    this._router.navigate([`${SUB_ADMINS}/${EDIT}`, this.subAdminDetails._id]);
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
