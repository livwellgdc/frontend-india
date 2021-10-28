import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CATEGORY } from '../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_CATEGORIES_FILTER_STATUS } from '../../../../../constants/breadcrumb-routes';
import { MatDialog } from '@angular/material';
import { AddEditCategoryComponent } from '../../_components/add-edit-category/add-edit-category.component';
import { CategoryService } from '../../_service/category.service';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common/common.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-categories-listing',
  templateUrl: './categories-listing.component.html',
  styleUrls: ['./categories-listing.component.scss']
})
export class CategoriesListingComponent extends Pagination implements OnInit, OnDestroy {
  tempList = [];
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Category Name', key: 'categoryName', sort: true, type: "link", link: `/${CATEGORY}` },
    { heading: "Created Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  filterForm: FormGroup;
  status = STATUS;
  subscriptions: Subscription[] = [];
  tempListSubscription = null; // for discarding api calls on change tabs
  actRouteStatus: string = '';
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _table: TableService,
    private _toast: ToastService,
    private _category: CategoryService,
    private _dialog: MatDialog,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.createForm();
    this.permissionHandler();
    this.manageQueryParams();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: [""]
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CATEGORIES);
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
          this.heading[this.heading.length - 1].action = this.removeAction([2, 3]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }


  manageQueryParams() {
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe(q => {
        if (isObjEmpty(q)) {
          this.actRouteStatus = '';
          this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS());
          this.getCategoryListing();
        } else {
          this.actRouteStatus = q.categoryType;
          switch (q.categoryType) {
            case this.API_EVENT.class:
              this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS('Class Categories'));
              this.getCategoryListing();
              break;
            case this.API_EVENT.challenge:
              this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS('Challenge Categories'));
              this.getCategoryListing();
              break;
            case this.API_EVENT.event:
              this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS('Event Categories'));
              this.getCategoryListing();
              break;
            case this.API_EVENT.livwellBenifit:
              this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS('Livwell Benefit Categories'));
              this.getCategoryListing();
              break;
              case this.API_EVENT.fitnessVideo:
                this._bc.setBreadcrumb(BC_CATEGORIES_FILTER_STATUS('Fitness Video Categories'));
                this.getCategoryListing();
                break;
            default:
              this._router.navigate([CATEGORY]);
              break;
          }
        }
      })
    );
  }

  getCategoryListing() {
    if (this.tempListSubscription) {
      this.tempListSubscription.unsubscribe();
      this.finallyGetCategories();
    } else {
      this.finallyGetCategories();
    }
  }

  finallyGetCategories() {
    let queryObj = {
      categoryType: this.actRouteStatus ? this.actRouteStatus : this.API_EVENT.generic,
      ...this.validPageOptions
    };
    this.tempListSubscription = this._category.getCategories(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      this.tempList = response.data;
      response.data.forEach(element => {
        element['categoryName'] = titleCase(element.name.en);
      });
      this._table.tableRender(response);
    }, () => {
      this.tempListSubscription = null;
      this._table.tableRender({ data: [] });
    });
  }

  addCategories(status: any) {
    status['categoryType'] = this.actRouteStatus ? this.actRouteStatus : this.API_EVENT.generic;

    /**
     * [ADD,EDIT]=[0,1]
     */
    const dialog = this._dialog.open(AddEditCategoryComponent, {
      autoFocus: false,
      disableClose: true,
      data: status
    })
    dialog.afterClosed().subscribe(result => {
      if (result && result.isHitApi) {
        this.getCategoryListing();
      }
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
    this.getCategoryListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getCategoryListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addCategories(status); // Edit Category
        break;
      default:
        this.changeCategoryStatus(status);
        break;
    }
  }

  changeCategoryStatus(categoryInfo: any) {
    const updateObj = {
      categoryId: categoryInfo.data._id,
      status: categoryInfo.action,
    };
    this._category.blockUnblockDeleteCategory(updateObj).subscribe(response => {
      if (categoryInfo.action == this.API_EVENT.delete && (categoryInfo.data.s_no > 1 && categoryInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getCategoryListing();
      this._toast.success(response.message);
    });
  }

  getButtunGroupStatus(status: string) {
    console.log("============status============", status)
    this.resetPages();
    if (status == this.API_EVENT.all) {
      this._router.navigate([CATEGORY]);
    } else {
      this._router.navigate([CATEGORY], { queryParams: { categoryType: status } });
    }
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
    this.getCategoryListing();
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
