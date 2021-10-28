import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { SELSES_TRACK_REPORT_API } from 'src/app/constants/api-end-point';
import { BC_SELES_TRACKER_REPORT_LIST } from 'src/app/constants/breadcrumb-routes';
import { dateToMs } from 'src/app/constants/helper';
import { REPORT_EXPORT_TYPE, SECTION_ID_OF } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { REPORTS } from 'src/app/constants/routes';
import { CommonService } from 'src/app/services/common/common.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SelesTrackerService } from '../../seles-tracker/_services/seles-tracker.service';


@Component({
  selector: 'lv-sales-tracker-report',
  templateUrl: './sales-tracker-report.component.html',
  styleUrls: ['./sales-tracker-report.component.scss'],
  providers: [SelesTrackerService]
})
export class SalesTrackerReportComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Code', key: 'code', align: 'center' },
    { heading: "LWC", key: "LWC", align: "center" },
    { heading: "Date", key: "date",align: 'center', type: 'date' },
    { heading: "Total", key: "limit", align: "center" },
    { heading: "Used", key: "used", align: "center" },
    { heading: "Remaining", key: "remaining", align: "center" }
    // { heading: "Client Id", key: "clientId", align: "center", type: 'arrayData' },
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  public filterForm: FormGroup
  public SECTION_ID_OF = SECTION_ID_OF;

  constructor(
    private _bc: BreadcrumbService,
    private _seles_tracker: SelesTrackerService,
    private _table: TableService,
    private _common: CommonService,
    private _fb: FormBuilder,
    private _router: Router,
    public _storage: StorageService,
    private _toast: ToastService,
  ) { super(); }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SELES_TRACKER_REPORT_LIST());
    // this.getSalesTrackList();
    this.createForm();
    this.filterOnload();

  }

  public filterOnload() {
   
    this.filterOptions = this.changeDateFormat(this.filterForm.value);
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getSalesTrackList();
  }

  createForm() {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1);

    this.filterForm = this._fb.group({
      // fromDate: [new Date(today.setHours(0, 0, 0))],
      fromDate: [""],
      toDate: [""]
    });
  }

  public getSalesTrackList(): void {
    let queryObj = {
      ...this.validPageOptions,
    }
    this._seles_tracker.getSalesTrackList(queryObj).subscribe(response => {
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
    this.getSalesTrackList();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getSalesTrackList();
  }

  public sendSelesReport() {
    let obj = {};
    obj['exportType'] = REPORT_EXPORT_TYPE.SENDMAIL;

    obj['token']  = this._storage.token,
    obj['timezone'] = this._storage.getTimeZone()

    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj['status'] = this.filterOptions.status;
      }
      if (this.filterOptions.fromDate) {
        obj['fromDate'] = this.filterOptions.fromDate;
      }
      if (this.filterOptions.toDate) {
        obj['toDate'] = this.filterOptions.toDate;
      }
    }
    if (this.search) {
      obj['searchKey'] = this.search;

    }

    this._common.sendMail(obj).subscribe(response => {
      console.log(response)
      this._toast.success("SENT REPORT SUCCESSFULLY");
    });
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

  private  updateQueryParams(updatedQueryParams = {}) {
    this._router.navigate([REPORTS], { queryParams: updatedQueryParams });
  }

  public filterApply(event: any) {
    if (!this.filterForm.dirty) {
      return;
    }
    if (event.apply) {
      this.filterOptions = this.changeDateFormat(this.filterForm.value);
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.updateQueryParams();
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getSalesTrackList();
  }

  downloadList(event) {
    let obj = [];
    obj.push({ key: 'exportType', value: REPORT_EXPORT_TYPE.DOWNLOAD });

    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
      if (this.filterOptions.fromDate) {
        obj.push({ key: 'fromDate', value: this.filterOptions.fromDate });
      }
      if (this.filterOptions.toDate) {
        obj.push({ key: 'toDate', value: this.filterOptions.toDate });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }

    this._common.exportReports(SELSES_TRACK_REPORT_API, obj);
  }
}
