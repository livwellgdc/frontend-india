import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { USERS } from './../../../../../../../constants/routes';
import { Pagination } from '../../../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { ClassService } from '../../../../_service/class.service';
import { BOOKING_STATUS, SECTION_ID_OF } from '../../../../../../../constants/messages';
import { CommonService } from '../../../../../../../services/common/common.service';
import { titleCase } from '../../../../../../../constants/helper';
import { PARTICIPANTS_EXPORT_API } from '../../../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';
@Component({
  selector: 'lv-booked-class-users',
  templateUrl: './booked-class-users.component.html',
  styleUrls: ['./booked-class-users.component.scss']
})
export class BookedClassUsersComponent extends Pagination implements OnInit {
  @Input() classId: string;
  heading = [
    { heading: "User Name", key: "fullName", type: "link", link: `/${USERS}` },
    { heading: "Booking Date", key: "created", align: "center", type: 'date' },
    { heading: "Booking Time", key: "created", align: "center", type: 'time' },
    { heading: "Seat No.", key: "seatNo", align: "center" },
    { heading: "Membership Type", key: "membershipType", align: "center", type: 'arrayData' },
    { heading: "Class Code", key: "code", align: "center" },
    { heading: "Club", key: "club", content: true },
    { heading: "Class Booked", key: "className", content: true },
    { heading: "Class Date", key: "classDate", align: "center", type: 'date' },
    { heading: "Class Time", key: "classTime", align: "center", type: 'time' },
    { heading: "Instructor", key: "instructor", align: "center", content: true },
    { heading: "Studio", key: "studio", align: "center" },
    { heading: "Booking Status", key: "status", align: "center", type: "formatStatus" },
  ];
  filterForm: FormGroup;
  bookingStatus = BOOKING_STATUS;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;

  constructor(
    private _fb: FormBuilder,
    private _class: ClassService,
    private _table: TableService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.permissionHadler();
    this.createForm();
    this.getUsersListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: [""]
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  permissionHadler() {
    let isPermission = this._common.viewPermissionHandler(SECTION_ID_OF.USERS);
    if (!isPermission) {
      delete this.heading[0].type;
      delete this.heading[0].link;
    }
  }

  getUsersListing() {
    let queryObj = {
      classId: this.classId,
      ...this.params
    }
    this._class.getBookedClassUsers(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['fullName'] = element.fullName ? titleCase(element.fullName) : '';
        element['code'] = (element.clubId && element.clubId.qrCode) ? (element.clubId.qrCode) : '';
        element['club'] = (element.clubId && element.clubId.name) ? (element.clubId.name) : '';
        element['className'] = (element.classId && element.classId.name) ? (element.classId.name) : '';
        element['classDate'] = (element.classId && element.classId.startTime) ? (element.classId.startTime) : '';
        element['classTime'] = (element.classId && element.classId.startTime) ? (element.classId.startTime) : '';
        element['instructor'] = (element.classId && element.classId.instructorName) ? (element.classId.instructorName) : '';
        element['studio'] = (element.classId && element.classId.studioName) ? (element.classId.studioName) : '';
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
    this.getUsersListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getUsersListing();
  }

  filterApply(event: any) {
    if (!this.filterForm.dirty) {
      return;
    }
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
    this.getUsersListing();
  }

  downloadList(event) {
    let obj = [
      { key: 'classId', value: this.classId }
    ];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(PARTICIPANTS_EXPORT_API, obj);
  }

}
