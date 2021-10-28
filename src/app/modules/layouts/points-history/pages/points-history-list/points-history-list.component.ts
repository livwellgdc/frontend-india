import { PointsHistoryService } from './../../_service/points-history.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { Pagination } from '../../../../../constants/paginator';
import { BC_POINTS_DISTRIBUTION_HISTORY } from '../../../../../constants/breadcrumb-routes';
import { titleCase, dateToMs, isObjEmpty } from '../../../../../constants/helper';
import { LWC_HISTORY_REPORT_API } from '../../../../../constants/api-end-point';
import { POINTS_EARNED_SPENDS_TYPE, POINTS_TYPE } from '../../../../../constants/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { POINTS_DISTRIBUTION_HISTORY } from '../../../../../constants/routes';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-points-history-list',
  templateUrl: './points-history-list.component.html',
  styleUrls: ['./points-history-list.component.scss'],
  providers: [PointsHistoryService]
})
export class PointsHistoryListComponent extends Pagination implements OnInit {

  heading = [
    { heading: "User Name", key: "fullName" },
    { heading: "Points", key: "points", align: "center", sort: true },
    { heading: "Date", key: "created", align: "center", type: 'date' },
    { heading: "Time", key: "created", align: "center", type: 'time' },
    { heading: "Points Earned / Spends On", key: "rewardType", align: "center", type: "formatStatus" }
  ];
  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  pointsType = POINTS_TYPE;
  clients = [];
  corporates = [];
  pointsEarnedSpendType = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _pointsHistory: PointsHistoryService,
    private _table: TableService,
    private _common: CommonService,
    private _actRoute: ActivatedRoute,
    private _router: Router
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_POINTS_DISTRIBUTION_HISTORY);
    this.createForm();
    this.setFilterFromQueryParams();
    this.getPointsHistoryListing();
    this.getClubClients();
    this.getAllCorporates();
  }

  createForm() {
    this.filterForm = this._fb.group({
      fromDate: [''],
      toDate: [''],
      rewardType: [''],
      type: [''],
      clientId: [''],
      corporateId: ['']
    });
  }

  get f() { return this.filterForm.controls } // retrun form controls

  setFilterFromQueryParams() {
    this._actRoute.queryParams.subscribe(q => {
      if (!isObjEmpty(q)) {
        if (q.type == this.pointsType[1].value) {
          this.f.type.setValue(q.type);
          this.onChangePointsType();
          if (q.fromDate) {
            this.f.fromDate.setValue(new Date(Number(q.fromDate)));
          }
          if (q.toDate) {
            this.f.toDate.setValue(new Date(Number(q.toDate)));
          }
          this.filterOptions = q;
          this.filterForm.markAsDirty();
        } else {
          this.resetQueryParams();
        }
      }
    })
  }

  getPointsHistoryListing() {
    this.subscriptions.push(
      this._pointsHistory.getLwcDistributionHistory(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['fullName'] = element.userId && element.userId.fullName ? titleCase(element.userId.fullName) : '';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  onChangeClients() {
    if (this.f.corporateId.value) {
      this.f.clientId.setValue('');
    }
  }

  onChangeCorporates() {
    if (this.f.clientId.value) {
      this.f.corporateId.setValue('');
    }
  }

  getClubClients() {
    this._pointsHistory.getAllClients().subscribe(res => {
      this.clients = res.data;
    })
  }

  getAllCorporates() {
    this._pointsHistory.getCorporates().subscribe(res => {
      this.corporates = res.data;
    })
  }

  onChangePointsType() {
    this.f.rewardType.setValue('');
    if (this.f.type.value == this.pointsType[1].value) {
      this.removeExtraValues(POINTS_EARNED_SPENDS_TYPE.length - 2, POINTS_EARNED_SPENDS_TYPE.length);
    } else {
      this.removeExtraValues(0, POINTS_EARNED_SPENDS_TYPE.length - 2);
    }
  }

  removeExtraValues(indexFromWhere: number, howManyElement: number) {
    this.pointsEarnedSpendType = POINTS_EARNED_SPENDS_TYPE.slice(indexFromWhere, howManyElement);
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
    this.getPointsHistoryListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getPointsHistoryListing();
  }

  selectFromDate(event: any) {
    this.f.toDate.setValue(null);
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
      this.f.corporateId.setValue('');
      this.f.clientId.setValue('');
    }
    this.resetQueryParams();
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getPointsHistoryListing();
  }

  changeDateFormat(obj: any) {
    if (obj.fromDate) {
      obj.fromDate = dateToMs(obj.fromDate);
    }
    if (obj.toDate) {
      obj.toDate = dateToMs(obj.toDate, true);
    }
    return obj;
  }

  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.rewardType) {
        obj.push({ key: 'rewardType', value: this.filterOptions.rewardType });
      }
      if (this.filterOptions.type) {
        obj.push({ key: 'type', value: this.filterOptions.type });
      }
      if (this.filterOptions.clientId) {
        obj.push({ key: 'clientId', value: this.filterOptions.clientId });
      }
      if (this.filterOptions.corporateId) {
        obj.push({ key: 'corporateId', value: this.filterOptions.corporateId });
        obj.push({ key: 'userType', value: 'CORPORATE' });
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

    this._common.exportReports(LWC_HISTORY_REPORT_API, obj);
  }

  resetQueryParams() {
    this._router.navigate([POINTS_DISTRIBUTION_HISTORY]);
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
