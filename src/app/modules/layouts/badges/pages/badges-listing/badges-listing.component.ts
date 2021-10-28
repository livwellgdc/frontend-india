import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BadgeService } from '../../_service/badge.service';
import { Pagination } from '../../../../../constants/paginator';
import { BADGES, ADD, EDIT } from './../../../../../constants/routes';
import { BC_BADGES } from '../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BADGE_TYPE, SECTION_ID_OF } from '../../../../../constants/messages';
import { isObjEmpty } from '../../../../../constants/helper';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-badges-listing',
  templateUrl: './badges-listing.component.html',
  styleUrls: ['./badges-listing.component.scss'],
  providers: [BadgeService]
})
export class BadgesListingComponent extends Pagination implements OnInit, OnDestroy {
  filterForm: FormGroup;
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Badge Name', key: 'name', sort: true, type: "link", link: `/${BADGES}` },
    { heading: 'Points', key: 'points', align: 'center' },
    { heading: "Type", key: "type", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1] }
  ];
  subscriptions: Subscription[] = [];
  badgeType = BADGE_TYPE;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _badge: BadgeService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BADGES);
    this.permissionHandler();
    this.createForm();
    this.getBadgeListing();
  }


  createForm() {
    this.filterForm = this._fb.group({
      type: [""]
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.BADGES);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice(this.heading.length - 1, 1);
      }
    }
  }

  getBadgeListing() {
    this.subscriptions.push(
      this._badge.getBadgeList(this.validPageOptions).subscribe(response => {
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addBadges(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${BADGES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${BADGES}/${EDIT}`, status.data._id]);
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
    this.getBadgeListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getBadgeListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addBadges(status);
        break;
      default:
        break;
    }
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
    this.getBadgeListing();
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
