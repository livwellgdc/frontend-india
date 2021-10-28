import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../_service/user.service';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { Router } from '@angular/router';
import { Pagination } from '../../../../../../../constants/paginator';
import { titleCase, formatChallengeType } from '../../../../../../../constants/helper';
import { BreadcrumbService } from '../../../../../../../components/breadcrumb/breadcrumb.service';
import { BC_USERS_DETAILS } from '../../../../../../../constants/breadcrumb-routes';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-blockchain-challenge-data',
  templateUrl: './blockchain-challenge-data.component.html',
  styleUrls: ['./blockchain-challenge-data.component.scss']
})
export class BlockchainChallengeDataComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Challenge Name', key: 'challengeName' },
    { heading: "Challenge Type", key: "type", align: 'center' },
    { heading: "Value", key: "value", align: "center" },
    { heading: "Start Date", key: "startTime", align: "center", type: 'date' },
    { heading: "Start Time", key: "startTime", align: "center", type: 'time' }
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _user: UserService,
    private _table: TableService,
    private _router: Router
  ) { super(); }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_USERS_DETAILS('Blockchain Challenge Data'));
    this.getBlockchainChallengeData();
  }

  getBlockchainChallengeData() {
    let queryObj = {
      userId: this._router.url.split('/')[2],
      ...this.pageParams,
    }
    this._user.getBlockchainChallengeData(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['challengeName'] = titleCase(element.challengeName);
        element['type'] = formatChallengeType(element.type);
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
    this.getBlockchainChallengeData();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getBlockchainChallengeData();
  }

}
