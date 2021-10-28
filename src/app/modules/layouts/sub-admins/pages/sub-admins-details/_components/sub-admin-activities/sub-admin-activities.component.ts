import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SubAdminService } from '../../../../_service/sub-admin.service';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { Pagination } from '../../../../../../../constants/paginator';
import { formatActivities, titleCase } from '../../../../../../../constants/helper';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-sub-admin-activities',
  templateUrl: './sub-admin-activities.component.html',
  styleUrls: ['./sub-admin-activities.component.scss'],
  providers: [SubAdminService]
})
export class SubAdminActivitiesComponent extends Pagination implements OnInit {
  @Input() subAdminId: string;
  heading = [
    { heading: "Module", key: "collectionName", align: 'center' },
    { heading: "Name", key: "msg", align: 'center' },
    { heading: "Action", key: "crudAction", align: 'center' },
    { heading: "Date", key: "created", align: "center", sort: true, type: 'date' },
    { heading: "Time", key: "created", align: "center", type: 'time' },
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _subAdmin: SubAdminService,
    private _table: TableService
  ) { super(); }

  ngOnInit() {
    this.getActivitiesListing();
  }

  getActivitiesListing() {
    let queryObj = {
      subAdminId: this.subAdminId,
      ...this.validPageOptions
    }
    this._subAdmin.getSubAdminActivities(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['collectionName'] = element.collectionName ? formatActivities(element.collectionName) : '';
        element['msg'] = element.msg ? titleCase(formatActivities(element.msg)) : '';
        element['crudAction'] = element.crudAction ? formatActivities(element.crudAction, 'USER') : '';
      })

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
    this.getActivitiesListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getActivitiesListing();
  }

}
