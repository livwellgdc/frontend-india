import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SUB_ADMINS, ADD, EDIT } from './../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { SubAdminService } from '../../_service/sub-admin.service';
import { BC_SUB_ADMINS } from '../../../../../constants/breadcrumb-routes';
import { titleCase } from '../../../../../constants/helper';
import { USER_STATUS } from '../../../../../constants/messages';
import { EnterReasonComponent } from '../../../../../components/enter-reason/enter-reason.component';
import { MatDialog } from '@angular/material';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-sub-admins-listing',
  templateUrl: './sub-admins-listing.component.html',
  styleUrls: ['./sub-admins-listing.component.scss'],
  providers: [SubAdminService]
})
export class SubAdminsListingComponent extends Pagination implements OnInit {
  filterForm: FormGroup;
  heading = [
    { heading: 'Name', key: 'name', faqContent: true, sort: true, type: "link", link: `/${SUB_ADMINS}` },
    { heading: "Email", key: "email", align: 'center' },
    { heading: "Created Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  subscriptions: Subscription[] = [];
  tempList = [];
  status = USER_STATUS;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _subAdmin: SubAdminService,
    public _common: CommonService,
    private _toast: ToastService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SUB_ADMINS);
    this.createForm();
    this.getSubAdminListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: ['']
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  getSubAdminListing() {
    this.subscriptions.push(
      this._subAdmin.getSubAdminList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addSubAdmins(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${SUB_ADMINS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${SUB_ADMINS}/${EDIT}`, status.data._id]);
    }
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
    this.getSubAdminListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getSubAdminListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addSubAdmins(status);
        break;
      default:
        this.changeSubAdminStatus(status);
        break;
    }
  }

  changeSubAdminStatus(rowData: any) {
    let body = {
      subAdminId: rowData.data._id,
      status: rowData.action
    }
    if (rowData.action == this.API_EVENT.active) {
      this.confirmStatus(body);
    } else {
      const dialogRef = this._dialog.open(EnterReasonComponent, {
        width: "600px",
        autoFocus: false,
        disableClose: true,
        data: {
          label: rowData.action == this.API_EVENT.block ? 'Blocking the Sub Admin' : 'Deleting the Sub Admin',
          placeholder: rowData.action == this.API_EVENT.block ? 'blocking the sub admin' : 'deleting the sub admin'
        }
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
    }
  }

  confirmStatus(body: any) {
    this._subAdmin.blockUnblockDeleteSubAdmin(body).subscribe(response => {
      if (body.action == this.API_EVENT.delete && (body.data.s_no > 1 && body.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getSubAdminListing();
      this._toast.success(response.message);
    });
  }

  submitFilter(event: any) {
    if (!this.filterForm.dirty) { return };
    if (event.apply) {
      this.filterOptions = this.filterForm.value;
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getSubAdminListing();
  }

  /**
   * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
    this._common.isApiCallInProgress.ofCity = true;
  }

}
