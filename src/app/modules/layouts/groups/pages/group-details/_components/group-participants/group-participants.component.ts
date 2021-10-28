import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../../../constants/paginator';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { titleCase } from '../../../../../../../constants/helper';
import { GroupService } from '../../../../_service/group.service';

@Component({
  selector: 'lv-group-participants',
  templateUrl: './group-participants.component.html',
  styleUrls: ['./group-participants.component.scss'],
  providers: [GroupService]
})
export class GroupParticipantsComponent extends Pagination implements OnInit {
  @Input() squadId: string;
  heading = [
    { heading: "User Name", key: "fullName" },
    { heading: "Total Steps", key: "steps", align: "center" },
    { heading: "Group Joined Date", key: "created", align: "center", type: 'date' },
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _group: GroupService,
    private _table: TableService,
  ) { super(); }

  ngOnInit() {
    this.getParticipantsListing();
  }


  getParticipantsListing() {
    let queryObj = {
      squadId: this.squadId,
      ...this.validPageOptions
    }
    this._group.getGroupParticipantUsers(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['fullName'] = element.userId && element.userId.fullName ? titleCase(element.userId.fullName) : '';
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
    this.getParticipantsListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getParticipantsListing();
  }

}
