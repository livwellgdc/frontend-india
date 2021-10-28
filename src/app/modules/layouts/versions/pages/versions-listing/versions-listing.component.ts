import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { VersionService } from '../../_service/version.service';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../../../../services/common/common.service';
import { Pagination } from '../../../../../constants/paginator';
import { BC_VERSIONS } from '../../../../../constants/breadcrumb-routes';
import { VERSIONS } from '../../../../../constants/routes';
import { titleCase } from '../../../../../constants/helper';
import { AddEditVersionsComponent } from '../../_components/add-edit-versions/add-edit-versions.component';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-versions-listing',
  templateUrl: './versions-listing.component.html',
  styleUrls: ['./versions-listing.component.scss']
})
export class VersionsListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Version Name', key: 'name', sort: true, type: "link", link: `/${VERSIONS}` },
    { heading: 'Current Version', key: 'currentVersion', align: 'center' },
    { heading: 'Platform', key: 'platform', align: 'center', type: 'formatStatus' },
    { heading: 'Update Type', key: 'updateType', align: 'center', type: 'formatStatus' },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  tempList = [];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _table: TableService,
    private _version: VersionService,
    private _dialog: MatDialog,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_VERSIONS);
    this.getVersionListing();
  }

  getVersionListing() {
    this.subscriptions.push(
      this._version.getVersions(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name);
          element['currentVersion'] = `v${element.currentVersion}`;
        })
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addVersions(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    const dialog = this._dialog.open(AddEditVersionsComponent, {
      autoFocus: false,
      disableClose: true,
      data: status
    })
    dialog.afterClosed().subscribe(result => {
      if (result && result.isHitApi) {
        this.getVersionListing();
      }
    });
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
    this.getVersionListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getVersionListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addVersions(status); // Edit Version
        break;
      default:
        this.changeVersionStatus(status);
        break;
    }
  }

  changeVersionStatus(versionInfo: any) {
    const updateObj = {
      versionId: versionInfo.data._id
    };
    this._version.deleteVersion(updateObj).subscribe(response => {
      if (versionInfo.action == this.API_EVENT.delete && (versionInfo.data.s_no > 1 && versionInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getVersionListing();
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
