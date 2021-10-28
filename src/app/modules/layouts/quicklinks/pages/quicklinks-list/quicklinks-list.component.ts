import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { ADD, EDIT, QUICK_LINKS } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_QUICK_LINKS } from '../../../../../constants/breadcrumb-routes';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { QuicklinksService } from '../../_services/quicklinks.service';

@Component({
  selector: 'lv-quicklinks-list',
  templateUrl: './quicklinks-list.component.html',
  styleUrls: ['./quicklinks-list.component.scss'],
  providers: [QuicklinksService]
})
export class QuicklinksListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Icon', key: 'icon', type: 'img', align: 'center' },
    { heading: 'Name', key: 'name', align: 'center', content: true, type: "link", link: `/${QUICK_LINKS}` },
    { heading: "Priority", key: "priority", align: "center", sort: true },
    { heading: "DeepLink", key: "deepLink", align: "center" },
    { heading: 'Action', key: 'status', type: 'action', action: [1,2,3] }
  ];
  public filterForm: FormGroup;
  public status = STATUS;
  private subscriptions: Subscription[] = [];
  private tempList = [];
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _quickLink: QuicklinksService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_QUICK_LINKS);
    this.permissionHandler();
    this.getQuickLinksListing();
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.QUICK_LINKS);
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

  private getQuickLinksListing() {
    this.subscriptions.push(
      this._quickLink.getQuickLinkList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name.en);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }


  public addQuiclLink(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${QUICK_LINKS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${QUICK_LINKS}/${EDIT}`, status.data._id]);
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
    this.getQuickLinksListing();
  }

  public sortByListing(event: any) {
    this.sortOptions = event;
    this.getQuickLinksListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addQuiclLink(status); // Edit Group
        break;
      default:
        this.changeQuickLinksStatus(status);
        break;
    }
  }

  private changeQuickLinksStatus(quickLinkDataData: any) {
    const updateObj = {
      quickLinkId: quickLinkDataData.data._id,
      status: quickLinkDataData.action,
    };
    this._quickLink.deleteQuickLink(updateObj).subscribe(response => {
      if (quickLinkDataData.action == this.API_EVENT.delete && (quickLinkDataData.data.s_no > 1 && quickLinkDataData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getQuickLinksListing();
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
    this.getQuickLinksListing();
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
