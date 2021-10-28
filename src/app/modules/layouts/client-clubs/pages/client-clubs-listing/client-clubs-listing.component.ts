import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ClientClubService } from '../../_service/client-club.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_CLIENT_CLUBS } from '../../../../../constants/breadcrumb-routes';
import { ADD, EDIT, CLIENT_CLUBS } from '../../../../../constants/routes';
import { isObjEmpty } from '../../../../../constants/helper';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-client-clubs-listing',
  templateUrl: './client-clubs-listing.component.html',
  styleUrls: ['./client-clubs-listing.component.scss'],
  providers: [ClientClubService]
})
export class ClientClubsListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Client Name', key: 'name', content: true, sort: true, type: "link", link: `/${CLIENT_CLUBS}` },
    { heading: 'Points Purchased', key: 'points', align: 'center' },
    { heading: 'Remaining Points', key: 'pointsRemaining', align: 'center' },
    { heading: 'Points Distribution Freq.', key: 'frequencyType', align: 'center', type: "formatStatus" },
    { heading: 'Points Distribution Status', key: 'status', align: 'center', type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  subscriptions: Subscription[] = [];
  tempList = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _clientClub: ClientClubService,
    public _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CLIENT_CLUBS);
    this.permissionHandler();
    this.getClientClubListing();
  }

  /**
  * @ROLE_MANAGEMENT
 */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CLIENTS);
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

  getClientClubListing() {
    this.subscriptions.push(
      this._clientClub.getClientClubList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addClientClubs(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CLIENT_CLUBS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CLIENT_CLUBS}/${EDIT}`, status.data._id]);
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
    this.getClientClubListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getClientClubListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addClientClubs(status);
        break;
      default:
        this.changeClientClubStatus(status);
        break;
    }
  }

  changeClientClubStatus(clientClubInfo: any) {
    const updateObj = {
      clientId: clientClubInfo.data._id,
      status: clientClubInfo.action
    };
    this._clientClub.deleteClientClub(updateObj).subscribe(response => {
      if (clientClubInfo.action == this.API_EVENT.delete && (clientClubInfo.data.s_no > 1 && clientClubInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getClientClubListing();
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
