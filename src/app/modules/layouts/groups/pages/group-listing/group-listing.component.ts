import { GROUPS, ADD, EDIT } from './../../../../../constants/routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { GroupService } from '../../_service/group.service';
import { Pagination } from '../../../../../constants/paginator';
import { BC_GROUPS } from '../../../../../constants/breadcrumb-routes';
import { isObjEmpty, titleCase } from '../../../../../constants/helper';
import { SECTION_ID_OF } from 'src/app/constants/messages';

@Component({
  selector: 'lv-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.scss'],
  providers: [GroupService]
})
export class GroupListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Group Name', key: 'name', sort: true, type: "link", link: `/${GROUPS}` },
    { heading: 'User Type', key: 'userType', align: "center" },
    { heading: "Short Name", key: "shortName", align: "center" },
    { heading: "Limit to Join", key: "userLimit", align: "center" },
    { heading: "Joined Participants", key: "totalParticipant", align: "center" },
    { heading: "Privacy", key: "privacy", align: "center" },
    { heading: "Created On", key: "created", align: "center", type: 'date' },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  tempList = [];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  
  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _group: GroupService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_GROUPS);
    this.permissionHandler();
    this.getGroupListing();
  }

   /**
   * @ROLE_MANAGEMENT
  */
    permissionHandler() {
      let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.GROUPS);
      if (!isObjEmpty(permission)) {
        if (!permission.addEdit && !permission.deleteBlock) {
          this.permissionClass = 'removeAddButton';
          this.heading.splice((this.heading.length - 1), 1);
        } else {
          if (!permission.addEdit) {
            this.permissionClass = 'removeAddButton';
            this.heading[this.heading.length - 1].action = this.removeAction([1, 5]);
          }
          if (!permission.deleteBlock) {
            this.heading[this.heading.length - 1].action = this.removeAction([2]);
          }
        }
      }
    }

    removeAction(valuesToRemove) {
      return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
    }
    
  getGroupListing() {
    this.subscriptions.push(
      this._group.getGroupList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name.en);
          element['userType'] = element.createdBy && element.createdBy.userType ? element.createdBy.userType : "ADMIN"
          element['privacy'] = element.privacy == 'PUBLIC' ? 'Public' : 'Corporate';
          element['isEdited'] = element.createdBy && element.createdBy.userType == "USER" ? false : true;
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addGroups(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${GROUPS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${GROUPS}/${EDIT}`, status.data._id]);
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
    this.getGroupListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getGroupListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addGroups(status); // Edit Group
        break;
      default:
        this.changeGroupStatus(status);
        break;
    }
  }

  changeGroupStatus(groupInfo: any) {
    const updateObj = {
      squadId: groupInfo.data._id,
      status: groupInfo.action,
    };
    this._group.deleteGroup(updateObj).subscribe(response => {
      if (groupInfo.action == this.API_EVENT.delete && (groupInfo.data.s_no > 1 && groupInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getGroupListing();
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
