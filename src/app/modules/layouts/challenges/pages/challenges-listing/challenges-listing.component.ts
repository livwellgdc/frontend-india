import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STATUS, SECTION_ID_OF, CHALLENGE_CATEGORY_TYPES_OBJECT } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { CHALLENGES, ADD, EDIT } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ChallengeService } from '../../_service/challenge.service';
import { BC_CHALLENGES } from '../../../../../constants/breadcrumb-routes';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { CHALLENGE_REPORT_API } from '../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-challenges-listing',
  templateUrl: './challenges-listing.component.html',
  styleUrls: ['./challenges-listing.component.scss'],
  providers: [ChallengeService]
})
export class ChallengesListingComponent extends Pagination implements OnInit, OnDestroy {
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Challenge Name', key: 'name', content: true, sort: true, type: "link", link: `/${CHALLENGES}` },
    { heading: 'Challenge Category', key: 'categoryName' },
    { heading: "Start Date", key: "startDate", align: "center", type: 'date', sort: true },
    { heading: "End Date", key: "endDate", align: "center", type: 'date' },
    { heading: "Start Time", key: "startDate", align: "center", type: 'time' },
    { heading: "End Time", key: "endDate", align: "center", type: 'time' },
    { heading: 'Total Participants', key: 'totalParticipant', align: 'center' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 5] }
  ];
  filterForm: FormGroup;
  status = STATUS;
  categoryList = [];
  classCategoryList = [];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _challenge: ChallengeService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CHALLENGES);
    this.permissionHandler();
    this.createForm();
    this.status.push({ name: 'Expired', value: 'EXPIRED' });
    this.getChallengeListing();
    this.getCategories(this.API_EVENT.challenge);
    this.getCategories(this.API_EVENT.class);
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryId: [''],
      classCategoryId: [''],
      status: ['']
    })
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CHALLENGES);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading[this.heading.length - 1].action = this.removeAction([1, 5]);
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

  getChallengeListing() {
    this.subscriptions.push(
      this._challenge.getChallengeList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['status'] =  element.categoryId.type == CHALLENGE_CATEGORY_TYPES_OBJECT.SERIES ? "-" : element.status;
          element['name'] = titleCase(element.name.en);
          element['sponsorName'] = titleCase(element.sponsorName);
          element['categoryName'] = titleCase(element.categoryId.name.en);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  getCategories(categoryType: string) {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: categoryType,
      status: this.API_EVENT.active
    }
    this.subscriptions.push(
      this._common.getCategories(queryObj).subscribe(res => {
        if (res.statusCode === 200) {
          if (categoryType === this.API_EVENT.challenge) {
            this.categoryList = res.data;
          } else {
            this.classCategoryList = res.data;
          }
        }
      })
    );
  }

  addChallenges(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CHALLENGES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CHALLENGES}/${EDIT}`, status.data._id]);
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
    this.getChallengeListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getChallengeListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addChallenges(status); // Edit Category
        break;
      case 5:
        this.copyChallenge(status.data);
        break;
      default:
        this.changeCategoryStatus(status);
        break;
    }
  }

  copyChallenge(rowData: any) {
    this._router.navigate([`${CHALLENGES}/${ADD}`], { queryParams: { copyChallenge: rowData._id } });
  }

  changeCategoryStatus(challengeInfo: any) {
    const updateObj = {
      challengeId: challengeInfo.data._id,
      status: challengeInfo.action,
    };
    this._challenge.blockUnblockDeleteChallenge(updateObj).subscribe(response => {
      this.getChallengeListing();
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
    this.getChallengeListing();
  }

  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
      if (this.filterOptions.classCategoryId) {
        obj.push({ key: 'classCategoryId', value: this.filterOptions.classCategoryId });
      }
      if (this.filterOptions.categoryId) {
        obj.push({ key: 'categoryId', value: this.filterOptions.categoryId });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(CHALLENGE_REPORT_API, obj);
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
