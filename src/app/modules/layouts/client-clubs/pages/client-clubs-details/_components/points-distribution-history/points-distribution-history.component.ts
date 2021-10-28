import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClientClubService } from '../../../../_service/client-club.service';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { Pagination } from '../../../../../../../constants/paginator';
import { titleCase } from '../../../../../../../constants/helper';
import { CommonService } from '../../../../../../../services/common/common.service';
import { POINTS_DISTRIBUTION_REPORT_API } from '../../../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-points-distribution-history',
  templateUrl: './points-distribution-history.component.html',
  styleUrls: ['./points-distribution-history.component.scss']
})
export class PointsDistributionHistoryComponent extends Pagination implements OnInit {
  @Input() clientId: string;
  heading = [
    { heading: "User Name", key: "fullName" },
    { heading: "Points", key: "points", align: "center" },
    { heading: "Date", key: "created", align: "center", type: 'date' },
    { heading: "Time", key: "created", align: "center", type: 'time' },
    { heading: "Frequency", key: "frequenctType", align: "center", type: "formatStatus" }
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _clientClub: ClientClubService,
    private _table: TableService,
    private _common: CommonService
  ) { super(); }

  ngOnInit() {
    this.getPointsDistributionList();
  }

  getPointsDistributionList() {
    let queryObj = {
      clientId: this.clientId,
      ...this.pageParams
    }
    if (this.search) {
      queryObj['searchKey'] = this.search;
    }
    this._clientClub.getPointsDistributionHistory(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['fullName'] = titleCase(element.fullName);
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
    this.getPointsDistributionList();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getPointsDistributionList();
  }

  downloadList(event) {
    let obj = [
      { key: 'clientId', value: this.clientId }
    ];
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(POINTS_DISTRIBUTION_REPORT_API, obj);
  }

}
