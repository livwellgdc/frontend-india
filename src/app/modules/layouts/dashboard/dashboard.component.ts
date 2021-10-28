import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './_service/dashboard.service';
import { BreadcrumbService } from '../../../components/breadcrumb/breadcrumb.service';
import { LIVWELL_CARD_COLLECTION, DASHBOARD_CARD_ID, POINTS_TYPE, DASHBOARD_TYPE, CORPORATE_CARD_COLLECTION } from '../../../constants/messages';
import { Pagination } from '../../../constants/paginator';
import { CLASSES, CHALLENGES, USERS, REWARDS, EVENTS, CLUBS, LIVWELL_VIDEOS, CLIENT_CLUBS, ARTICLES, POINTS_DISTRIBUTION_HISTORY, DASHBOARD } from '../../../constants/routes';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { dateToMs } from '../../../constants/helper';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'lv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent extends Pagination implements OnInit {

  filterForm: FormGroup;
  cards = LIVWELL_CARD_COLLECTION;
  dashboardTypes = DASHBOARD_TYPE;
  selectedType = DASHBOARD_TYPE.LIVWELL;
  subscriptions: Subscription[] = [];
  corporates = [];
  @ViewChild('formRef', null) formRef: NgForm;

  constructor(
    private _bc: BreadcrumbService,
    private _dashboard: DashboardService,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _router: Router) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(null);
    this.createForm();
    this.getCompleteDataOfDashboard(this.getQueryParams());
    this.getAllCorporates();
  }

  createForm() {
    this.filterForm = this._fb.group({
      fromDate: [],
      toDate: [],
      corporateId: ['']
    })
  }

  get f() { return this.filterForm.controls } //return all form controls

  showLivwellDashboard(dashboardType: string) {
    if (this.selectedType == this.dashboardTypes.CORPORATE) {
      this.resetFields();
      this.cards = LIVWELL_CARD_COLLECTION;
      this.selectedType = dashboardType;
      let queryParamObj = this.getQueryParams();
      this.showLoadingStateOnCard();
      this.getCompleteDataOfDashboard(queryParamObj);
    }
  }

  showCorporateDashboard(dashboardType: string) {
    if (this.selectedType == this.dashboardTypes.LIVWELL) {
      this.resetFields();
      this.cards = CORPORATE_CARD_COLLECTION;
      this.selectedType = dashboardType;
      let queryParamObj = this.getQueryParams();
      this.showLoadingStateOnCard();
      this.getCompleteDataOfDashboard(queryParamObj);
    }
  }

  getCompleteDataOfDashboard(queryParamObj?) {
    if (queryParamObj) {
      Object.keys(queryParamObj).forEach(key => (queryParamObj[key] == null || queryParamObj[key] == "") && delete queryParamObj[key]);
    }
    this.subscriptions.push(
      this._dashboard.getDashboardData(queryParamObj ? queryParamObj : '').subscribe(response => {
        this.cards.forEach(element => {
          if (element._id in response.data) {
            let key = element._id
            element.activeCount = response.data[key].active;
            element.totalCount = response.data[key].total;
          }
        });
      }, (error) => {
        this.showLoadingStateOnCard('0');
      })
    );
  }

  getAllCorporates() {
    this._dashboard.getCorporates().subscribe(res => {
      this.corporates = res.data;
    })
  }

  onClickCard(cardData: any) {
    if (this.selectedType == this.dashboardTypes.CORPORATE)
      return
    let queryParamObj = this.getQueryParams(false);

    switch (cardData._id) {

      case DASHBOARD_CARD_ID.CLASSES:
        this.navigate(CLASSES, { classStatus: this.API_EVENT.ongoing, ...queryParamObj });
        break;

      case DASHBOARD_CARD_ID.CHALLENGES:
        this.navigate(CHALLENGES);
        break;

      case DASHBOARD_CARD_ID.CLIENT_LWC_DISTRIBUTION:
        this.navigate(CLIENT_CLUBS);
        break;

      case DASHBOARD_CARD_ID.LWC_REDEEMED:
        this.navigate(POINTS_DISTRIBUTION_HISTORY, { type: POINTS_TYPE[1].value, ...queryParamObj });
        break;

      case DASHBOARD_CARD_ID.ARTICLES:
        this.navigate(ARTICLES);
        break;

      case DASHBOARD_CARD_ID.EVENTS:
        this.navigate(EVENTS, { eventStatus: this.API_EVENT.ongoing, ...queryParamObj });
        break;

      case DASHBOARD_CARD_ID.VOUCHER_REDEEMED:
      case DASHBOARD_CARD_ID.REWARDS:
        this.navigate(REWARDS);
        break;

      case DASHBOARD_CARD_ID.CLUBS:
        this.navigate(CLUBS);
        break;

      case DASHBOARD_CARD_ID.LIVWELL_VIDEOS:
        this.navigate(LIVWELL_VIDEOS);
        break;

      case DASHBOARD_CARD_ID.URBOX_VOUCHER_REDEEMED:
        this.navigate(DASHBOARD);
        break;

      default:
        this.navigate(USERS, queryParamObj);
        break;
    }
  }

  getQueryParams(isTypeReq = true) {
    let queryParamObj = {};
    if (isTypeReq) {
      queryParamObj['dashboardType'] = this.selectedType;
    }
    if (this.f.fromDate.value) {
      queryParamObj['fromDate'] = dateToMs(this.f.fromDate.value);
    }
    if (this.f.toDate.value) {
      queryParamObj['toDate'] = dateToMs(this.f.toDate.value, true);
    }
    if (this.selectedType === this.dashboardTypes.CORPORATE && this.f.corporateId.value) {
      queryParamObj['corporateId'] = this.f.corporateId.value;
    }
    return queryParamObj;
  }

  startDateChange() {
    this.f.toDate.setValue(null);
  }

  applyFilter() {
    if (this.filterForm.dirty) {
      let queryParamObj = this.getQueryParams();
      this.showLoadingStateOnCard();
      this.getCompleteDataOfDashboard(queryParamObj);
    }
  }

  resetFilter() {
    if (this.filterForm.dirty) {
      this.resetFields();
      let queryParamObj = this.getQueryParams();
      this.showLoadingStateOnCard();
      this.getCompleteDataOfDashboard(queryParamObj);
    }
  }

  resetFields() {
    this.formRef.resetForm();
    this.f.corporateId.setValue('');
  }

  showLoadingStateOnCard(value = '...') {
    this.cards.forEach(e => {
      e.activeCount = value;
      e.totalCount = value;
    })
  }

  navigate(route: any, query = {}) {
    this._router.navigate([route], { queryParams: query })
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
