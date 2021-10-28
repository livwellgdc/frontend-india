import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { BC_SELES_TRACKER_LIST } from 'src/app/constants/breadcrumb-routes';
import { Pagination } from 'src/app/constants/paginator';
import { SelesTrackerService } from '../../_services/seles-tracker.service';

@Component({
  selector: 'lv-assigned-codes-list',
  templateUrl: './assigned-codes-list.component.html',
  styleUrls: ['./assigned-codes-list.component.scss'],
  providers: [SelesTrackerService]
})
export class AssignedCodesListComponent extends Pagination implements OnInit {

  heading = [
    { heading: 'Name', key: 'referreName', align: 'center' },
    { heading: "Code", key: "referralCode",align: 'center' },
    { heading: "Limit", key: "limit", align: "center" },
    { heading: "LWC", key: "lwcCredit", align: "center" }
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _seles_tracker: SelesTrackerService,
    private _table: TableService,
  ) { super(); }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SELES_TRACKER_LIST());
    this.getAssignedList();
  }

  public getAssignedList(): void {
    let queryObj = {
      ...this.validPageOptions,
    }
    this._seles_tracker.getAssigedList(queryObj).subscribe(response => {
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
    this.getAssignedList();
  }

  // sortByListing(event: any) {
  //   this.sortOptions = event;
  //   this.getBadgeEarnings();
  // }


}
