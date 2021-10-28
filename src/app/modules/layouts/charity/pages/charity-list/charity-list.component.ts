import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { CHALLENGE_REPORT_API } from 'src/app/constants/api-end-point';
import { BC_CHARITY } from 'src/app/constants/breadcrumb-routes';
import { isObjEmpty, titleCase } from 'src/app/constants/helper';
import { SECTION_ID_OF, STATUS } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { ADD, CHARITY, EDIT } from 'src/app/constants/routes';
import { CommonService } from 'src/app/services/common/common.service';
import { CharityService } from '../../_services/charity.service';

@Component({
  selector: 'lv-charity-list',
  templateUrl: './charity-list.component.html',
  styleUrls: ['./charity-list.component.scss'],
  providers: [CharityService]
})
export class CharityListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Logo', key: 'logo', type: 'img', align: 'center' },
    { heading: 'Name', key: 'name', align: 'center', content: true, type: "link", link: `/${CHARITY}`},
    { heading: "Email", key: "email", align: "center" },
    { heading: "Mobile", key: "mobileNo", align: "center" },
    { heading: "Status", key: "status", align: "center" },
    { heading: 'Action', key: 'action', type: 'action', action: [1, 3] }
  ];
  public filterForm: FormGroup;
  public categoryList = [];
  public classCategoryList = [];
  private subscriptions: Subscription[] = [];
  private tempList = [];
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _charity: CharityService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CHARITY);
    this.permissionHandler();
    this.getCharityListing();
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CHARITY);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading[this.heading.length - 1].action = this.removeAction([1]);
        }
        if (!permission.deleteBlock) {
          this.heading[this.heading.length - 1].action = this.removeAction([3]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  getCharityListing() {
    this.subscriptions.push(
      this._charity.getCharityList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
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

  public addCharity(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CHARITY}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CHARITY}/${EDIT}`, status.data._id]);
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
    this.getCharityListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getCharityListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addCharity(status); // Edit Group
        break;
      default:
        this.changeCharityStatus(status);
        break;
    }
  }

  private changeCharityStatus(charityData: any) {
   const updateObj = {
      charityId: charityData.data._id,
      status: charityData.action,
    };
    this._charity.deleteCharity(updateObj).subscribe(response => {
      if (charityData.action == this.API_EVENT.delete && (charityData.data.s_no > 1 && charityData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getCharityListing();
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
    this.getCharityListing();
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
