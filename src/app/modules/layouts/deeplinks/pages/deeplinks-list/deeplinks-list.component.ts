import { Component, OnInit, ViewChild } from '@angular/core';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import {  ADD, DEEP_LINKS, EDIT, STORIES } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_STORIES } from '../../../../../constants/breadcrumb-routes';
import { isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { DeeplinksService } from '../../_services/deeplinks.service';

@Component({
  selector: 'lv-deeplinks-list',
  templateUrl: './deeplinks-list.component.html',
  styleUrls: ['./deeplinks-list.component.scss'],
  providers: [DeeplinksService]

})
export class DeeplinksListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Screen Name', key: 'name',align: 'center', content: true, sort: true, type: "link", link: `/${DEEP_LINKS}` },
    { heading: "Screen URL", key: "url", align: "center"},
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  private subscriptions: Subscription[] = [];
  private tempList = [];
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _deepLink: DeeplinksService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_STORIES);
    this.permissionHandler();
    this.getDepplinkListing();
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.DEEP_LINKS);
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

  public getDepplinkListing() {
    this.subscriptions.push(
      this._deepLink.getDeeplinkList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  public addDeeplink(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${DEEP_LINKS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${DEEP_LINKS}/${EDIT}`, status.data._id]);
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
    this.getDepplinkListing();
  }

  public sortByListing(event: any) {
    this.sortOptions = event;
    this.getDepplinkListing();
  }

  public changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addDeeplink(status); 
        break;
      default:
        this.changeDeeplinkStatus(status);
        break;
    }
  }

  private changeDeeplinkStatus(storyData: any) {
   const updateObj = {
      storyId: storyData.data._id,
      status: storyData.action,
    };
    this._deepLink.deleteDeeplink(updateObj).subscribe(response => {
      if (storyData.action == this.API_EVENT.delete && (storyData.data.s_no > 1 && storyData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getDepplinkListing();
      this._toast.success(response.message);
    });
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
