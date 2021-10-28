import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { REWARDS, ADD, EDIT } from '../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { RewardsService } from '../../_service/rewards.service';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { BC_REWARDS } from '../../../../../constants/breadcrumb-routes';
import { STATUS, SECTION_ID_OF, REWARD_TYPE } from '../../../../../constants/messages';
import { CommonService } from '../../../../../services/common/common.service';
import { Subscription } from 'rxjs';
import { REWARD_REPORT_API } from '../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-rewards-listing',
  templateUrl: './rewards-listing.component.html',
  styleUrls: ['./rewards-listing.component.scss'],
  providers: [RewardsService]
})
export class RewardsListingComponent extends Pagination implements OnInit, OnDestroy {

  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Reward Name', key: 'name', sort: true, type: "link", link: `/${REWARDS}` },
    { heading: 'Livwell Benefit', key: 'categoryName' },
    { heading: "Reward Validity", key: "validity", align: "center", type: 'date', sort: true },
    { heading: "Coupon Validity", key: "redemptionValidity", align: "center" },
    { heading: 'Reward Type', key: 'type', align: 'center', type: "formatStatus" },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'DealsOfTheDay', key: 'checkbox', type: "checkBox", align: "center" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2] }
  ];
  filterForm: FormGroup;
  status = STATUS;
  livwellBenefitList = [];
  subscriptions: Subscription[] = [];
  rewardType = REWARD_TYPE;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;
  
  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _reward: RewardsService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_REWARDS);
    this.permissionHandler();
    this.createForm();
    this.status.push({ name: 'Expired', value: 'EXPIRED' });
    this.getRewardListing();
    this.getLivWellBenefits();
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryId: [''],
      type: [''],
      status: ['']
    })
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.REWARDS);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 2), 1);
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading.splice((this.heading.length - 2), 1);
          this.heading[this.heading.length - 1].action = this.removeAction([1]);
        }
        if (!permission.deleteBlock) {
          this.heading[this.heading.length - 1].action = this.removeAction([2]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  getRewardListing() {
    this.subscriptions.push(
      this._reward.getRewardList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['isTempDealsOfTheDay'] = element.isDealsOfTheDay ? element.isDealsOfTheDay : false;
          element['name'] = titleCase(element.name.en);
          element['categoryName'] = titleCase(element.categoryId.name.en);
          element['redemptionValidity'] = element.redemptionValidity ?
            (element.redemptionValidity > 1 ? (element.redemptionValidity + ' Days') : (element.redemptionValidity + ' Day')) :
            '';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  getLivWellBenefits() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.livwellBenifit,
      status: this.API_EVENT.active
    }
    this.subscriptions.push(
      this._common.getCategories(queryObj).subscribe(res => {
        if (res.statusCode === 200) {
          this.livwellBenefitList = res.data;
        }
      })
    );
  }

  addRewards(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${REWARDS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${REWARDS}/${EDIT}`, status.data._id]);
    }
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
    this.getRewardListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getRewardListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addRewards(status); // Edit Category
        break;
      default:
        this.changeCategoryStatus(status);
        break;
    }
  }

  public switchBooleanValue(rewardInfo: any) {
    const updateObj = {
      rewardId: rewardInfo.rewardId,
      isDealsOfTheDay: rewardInfo.isDealsOfTheDay,
    };
    this._reward.updateDealsOfTheDay(updateObj).subscribe(response => {
      this._toast.success(response.message);
    });
  }

  changeCategoryStatus(rewardInfo: any) {
    const updateObj = {
      rewardId: rewardInfo.data._id,
      status: rewardInfo.action,
    };
    this._reward.blockUnblockDeleteReward(updateObj).subscribe(response => {
      this.getRewardListing();
      this._toast.success(response.message);
    });
  }

  submitFilter(event: any) {
    if (!this.filterForm.dirty) { return };
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
    this.getRewardListing();
  }

  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
      if (this.filterOptions.categoryId) {
        obj.push({ key: 'categoryId', value: this.filterOptions.categoryId });
      }
      if (this.filterOptions.type) {
        obj.push({ key: 'type', value: this.filterOptions.type });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(REWARD_REPORT_API, obj);
  }

  /**
   * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    this.status.pop();
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}
