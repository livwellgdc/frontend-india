import { CHALLENGE_PARTICIPANT_USERS_REPORT_API } from './../../../../../../../constants/api-end-point';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChallengeService } from '../../../../_service/challenge.service';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { Pagination } from '../../../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CHALLENGE_PARTICIPANTS_STATUS, SECTION_ID_OF } from '../../../../../../../constants/messages';
import { dateToMs, titleCase } from '../../../../../../../constants/helper';
import { USERS } from './../../../../../../../constants/routes';
import { CommonService } from '../../../../../../../services/common/common.service';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-challenge-participants',
  templateUrl: './challenge-participants.component.html',
  styleUrls: ['./challenge-participants.component.scss']
})
export class ChallengeParticipantsComponent extends Pagination implements OnInit {
  @Input() challengeId: string;
  heading = [
    { heading: "User Name", key: "fullName", type: "link", link: `/${USERS}` },
    { heading: "Challenge Start Date", key: "startTime", align: "center", sort: true, type: 'date' },
    { heading: "Challenge Start Time", key: "startTime", align: "center", sort: true, type: 'time' },
    { heading: "Challenge Status", key: "status", align: "center", type: "formatStatus" },
  ];
  filterForm: FormGroup;
  challengeParticipantsStatus = CHALLENGE_PARTICIPANTS_STATUS;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;

  constructor(
    private _fb: FormBuilder,
    private _challenge: ChallengeService,
    private _table: TableService,
    private _common: CommonService
  ) { super(); }

  ngOnInit() {
    this.permissionHadler();
    this.createForm();
    this.getParticipantsListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: [""],
      fromDate: [""],
      toDate: [""],
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

  getParticipantsListing() {
    let queryObj = {
      challengeId: this.challengeId,
      ...this.validPageOptions
    }
    this._challenge.getChallengeParticipantUsers(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['fullName'] = element.fullName ? titleCase(element.fullName) : '';
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


  private changeDateFormat(obj: any) {
    if (obj.fromDate) {
      obj.fromDate = dateToMs(obj.fromDate);
    }
    if (obj.toDate) {
      obj.toDate = dateToMs(obj.toDate, true);
    }
    return obj;
  }
  
  filterApply(event: any) {
    if (!this.filterForm.dirty) {
      return;
    }
    if (event.apply) {
      this.filterOptions = this.changeDateFormat(this.filterForm.value);
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getParticipantsListing();
  }

  downloadList(event) {
    let obj = [
      { key: 'challengeId', value: this.challengeId }
    ];
    
    if (this.filterOptions) {
      if (this.filterOptions.fromDate) {
        obj.push({ key: 'fromDate', value: this.filterOptions.fromDate });
      }
    }
    if (this.filterOptions) {
      if (this.filterOptions.toDate) {
        obj.push({ key: 'toDate', value: this.filterOptions.toDate });
      }
    }
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(CHALLENGE_PARTICIPANT_USERS_REPORT_API, obj);
  }

}
