import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { ADD, EDIT, SPIN_WHEEL } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_SPIN_WHEEL } from '../../../../../constants/breadcrumb-routes';
import { isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { SpinWheelsService } from '../../_services/spin-wheels.service';

@Component({
  selector: 'lv-spin-wheels-list',
  templateUrl: './spin-wheels-list.component.html',
  styleUrls: ['./spin-wheels-list.component.scss'],
  providers: [SpinWheelsService]

})
export class SpinWheelsListComponent extends Pagination implements OnInit, OnDestroy {

  public heading = [
    { heading: 'Title', key: 'title', align: 'center'},
    { heading: "value", key: "value", align: "center" },
    { heading: "weight", key: "weight", align: "center" },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  public filterForm: FormGroup;
  public status = STATUS;
  public categoryList = [];
  public classCategoryList = [];
  private subscriptions: Subscription[] = [];
  private tempList = [];
  
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _spinWheel: SpinWheelsService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SPIN_WHEEL);
    this.permissionHandler();
    this.getSpinWheelList();
  }

  /**
   * @ROLE_MANAGEMENT
  */
  private permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.SPIN_WHEEL);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading[this.heading.length - 1].action = this.removeAction([1]);
        }
        if (!permission.deleteBlock) {
          this.heading[this.heading.length - 1].action = this.removeAction([3]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  private getSpinWheelList() {
    this.subscriptions.push(
      this._spinWheel.getSpinWheelList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['description'] = element.description.en ? element.description.en : element.description;
          // element['description'] = titleCase(element.description);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }


  public addSpinWheel(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${SPIN_WHEEL}/${ADD}`]);
    }
    else {
      this._router.navigate([`${SPIN_WHEEL}/${EDIT}`, status.data._id]);
    }
  }

  public paginationWithSearch(ev: any, id: number) {
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
    this.getSpinWheelList();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getSpinWheelList();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addSpinWheel(status); // Edit Group
        break;
      default:
        this.changeSpinWheelStatus(status);
        break;
    }
  }

  private changeSpinWheelStatus(spinWheelData: any) {
    const updateObj = {
      spinnerWheelMetaId: spinWheelData.data._id,
      status: spinWheelData.action,
    };
    this._spinWheel.deleteSpinWheel(updateObj).subscribe(response => {
      if (spinWheelData.action == this.API_EVENT.delete && (spinWheelData.data.s_no > 1 && spinWheelData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getSpinWheelList();
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
    this.getSpinWheelList();
  }

  /**
   * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    this.status.pop();
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}
