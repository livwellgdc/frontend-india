import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import {  ADD, EDIT, STORIES } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_STORIES } from '../../../../../constants/breadcrumb-routes';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { StoriesService } from '../../_services/stories.service';


@Component({
  selector: 'lv-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss'],
  providers: [StoriesService]
})
export class StoriesListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Story Name', key: 'name',align: 'center', content: true, sort: true, type: "link", link: `/${STORIES}` },
    { heading: "Start Date", key: "startDate", align: "center", type: 'date', sort: true },
    { heading: "Expiry Date", key: "expiryDate", align: "center", type: 'date' },
    { heading: "Start Time", key: "startDate", align: "center", type: 'time' },
    { heading: "Expiry Time", key: "expiryDate", align: "center", type: 'time' },
    { heading: "Duration Time(SEC)", key: "displayDurationTime", align: "center" },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  public filterForm: FormGroup;
  public status = STATUS;
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
    private _story: StoriesService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_STORIES);
    this.permissionHandler();
    this.createForm();
    this.status.push({ name: 'Expired', value: 'EXPIRED' });
    this.getStoryListing();
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
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.STORIES);
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

  getStoryListing() {
    this.subscriptions.push(
      this._story.getStoryList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name.en);
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

  addStory(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${STORIES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${STORIES}/${EDIT}`, status.data._id]);
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
    this.getStoryListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getStoryListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addStory(status); // Edit Group
        break;
      default:
        this.changeStoryStatus(status);
        break;
    }
  }

  private changeStoryStatus(storyData: any) {
   const updateObj = {
      storyId: storyData.data._id,
      status: storyData.action,
    };
    this._story.deleteStory(updateObj).subscribe(response => {
      if (storyData.action == this.API_EVENT.delete && (storyData.data.s_no > 1 && storyData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getStoryListing();
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
    this.getStoryListing();
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
