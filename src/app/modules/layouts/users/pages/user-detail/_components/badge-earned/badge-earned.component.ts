import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../../../constants/paginator';
import { UserService } from '../../../../_service/user.service';
import { BADGES } from './../../../../../../../constants/routes';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { titleCase } from '../../../../../../../constants/helper';
import { Router } from '@angular/router';
import { BC_USERS_DETAILS } from '../../../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../../../components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-badge-earned',
  templateUrl: './badge-earned.component.html',
  styleUrls: ['./badge-earned.component.scss']
})
export class BadgeEarnedComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: "Badge Name", key: "badgeName", type: "link", link: `/${BADGES}` },
    { heading: "Challenge Name", key: "challengeName", align: "center" },
    { heading: "Badge Earned Date", key: "created", align: "center", sort: true, type: 'date' },
    { heading: "Badge Earned Time", key: "created", align: "center", sort: true, type: 'time' }
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _user: UserService,
    private _table: TableService,
    private _router: Router
  ) { super(); }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_USERS_DETAILS());
    this.getBadgeEarnings();
  }

  getBadgeEarnings() {
    let queryObj = {
      userId: this._router.url.split('/')[2],
      ...this.validPageOptions,
    }
    this._user.getEarnedBadges(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['_id'] = element.badgeId._id;
        element['image'] = element.badgeId.image;
        element['badgeName'] = titleCase(element.badgeId.name);
        element['challengeName'] = element.challengeId && element.challengeId.name ? titleCase(element.challengeId.name.en) : '';
      });
      this._table.tableRender(response);
    }, () => {
      this._table.tableRender({ data: [] });
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
    this.getBadgeEarnings();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getBadgeEarnings();
  }

}
