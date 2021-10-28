import { MatTableRendererComponent } from './../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_USERS } from '../../../../../constants/breadcrumb-routes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { dateToMs, titleCase, encryptEmailPhone, isObjEmpty } from '../../../../../constants/helper';
import { Pagination } from '../../../../../constants/paginator';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { UserService } from '../../_service/user.service';
import { USERS } from '../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common/common.service';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { EnterReasonComponent } from '../../../../../components/enter-reason/enter-reason.component';
import { MatDialog } from '@angular/material';
import { USERS_REPORT_API } from '../../../../../constants/api-end-point';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lv-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
  providers: [UserService]
})
export class UserListingComponent extends Pagination implements OnInit, OnDestroy {
  heading = [
    { heading: "Name", key: "fullName", type: "link", link: `/${USERS}`, sort: true },
    { heading: "Uid", key: "uid", align: 'center' },
    { heading: "Email", key: "email", align: 'center' },
    { heading: "Mobile Number", key: "mobileNo", align: 'center' },
    { heading: "Date of Birth", key: "dob", type: "date", align: "center", sort: true },
    { heading: "Registration Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: "Badge Earned", key: "badgeEarned", align: 'center' },
    { heading: "Reward Earned", key: "rewardEarned", align: 'center' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: "Action", key: "status", type: "action", action: [2] }
  ];
  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;
  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _user: UserService,
    private _table: TableService,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog,
    private _actRoute: ActivatedRoute,
    private _router: Router
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_USERS);
    this.permissionHandler();
    this.createForm();
    this.setFilterFromQueryParams();
    this.getUsersListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: [""],
      fromDate: [""],
      toDate: [""],
      isFLgMembership: []
    });
  }

  get f() { return this.filterForm.controls }  //return all form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.USERS);
    if (!isObjEmpty(permission)) {
      if (!permission.deleteBlock) {
        this.heading.splice(this.heading.length - 1, 1);
      }
    }
  }

  setFilterFromQueryParams() {
    this._actRoute.queryParams.subscribe(q => {
      if (!isObjEmpty(q)) {
        if ('fromDate' in q && 'toDate' in q) {
          this.patchValues(q);
        } else if ('fromDate' in q) {
          this.patchValues({ fromDate: q.fromDate }, true, false);
          this.updateQueryParams({ fromDate: q.fromDate });
        } else if ('toDate' in q) {
          this.patchValues({ toDate: q.toDate }, false, true);
          this.updateQueryParams({ toDate: q.toDate });
        } else {
          this.updateQueryParams();
        }
      }
    })
  }

  patchValues(queryParamsObj, inFromDate = true, inToDate = true) {
    if (inFromDate) {
      this.f.fromDate.setValue(new Date(Number(queryParamsObj.fromDate)));
    }
    if (inToDate) {
      this.f.toDate.setValue(new Date(Number(queryParamsObj.toDate)));
    }
    this.filterOptions = queryParamsObj;
    this.filterForm.markAsDirty();
  }

  updateQueryParams(updatedQueryParams = {}) {
    this._router.navigate([USERS], { queryParams: updatedQueryParams });
  }

  getUsersListing() {
    this.subscriptions.push(
      this._user.getUsers(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['fullName'] = titleCase(element.fullName);
          element['email'] = encryptEmailPhone('EMAIL', element.email);
          element['mobileNo'] = encryptEmailPhone('PHONE', element.mobileNo);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  paginationWithSearch(ev: any, id: number) {
    switch (id) {
      case 0:
        this.resetPages();
        this.search = ev;
        if (this.tableRef.paginator) {
          this.tableRef.paginator.firstPage();
        }
        break;
      default:
        this.pageOptionsOnChange = ev;
        break;
    }
    this.getUsersListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getUsersListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        break;
      default:
        this.changeUserStatus(status);
        break;
    }
  }

  changeUserStatus(rowData: any) {
    let body = {
      userId: rowData.data._id,
      status: rowData.action
    }
    if (rowData.action == this.API_EVENT.block) {
      const dialogRef = this._dialog.open(EnterReasonComponent, {
        width: "600px",
        autoFocus: false,
        disableClose: true,
        data: { label: 'Blocking the User', placeholder: 'blocking the user' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let bodyWithReason = {
            ...body,
            ...result
          };
          this.confirmStatus(bodyWithReason);
        }
      });
    } else {
      this.confirmStatus(body);
    }
  }

  confirmStatus(body: any) {
    this._user.blockUnblockUser(body).subscribe(response => {
      this.getUsersListing();
      this._toast.success(response.message);
    });
  }

  filterApply(event: any) {
    if (!this.filterForm.dirty) {
      return;
    }
    if (event.apply) {
      this.filterOptions = this.changeDateFormat(this.filterForm.value);
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.updateQueryParams();
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getUsersListing();
  }

  changeDateFormat(obj: any) {
    if (obj.fromDate) {
      obj.fromDate = dateToMs(obj.fromDate);
    }
    if (obj.toDate) {
      obj.toDate = dateToMs(obj.toDate, true);
    }
    return obj;
  }

  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
      if (this.filterOptions.fromDate) {
        obj.push({ key: 'fromDate', value: this.filterOptions.fromDate });
      }
      if (this.filterOptions.toDate) {
        obj.push({ key: 'toDate', value: this.filterOptions.toDate });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }

    this._common.exportReports(USERS_REPORT_API, obj);
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
