import { LivwellVideoService } from './../../_service/livwell-video.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIVWELL_VIDEOS, ADD, EDIT } from './../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_LIVWELL_VIDEOS } from '../../../../../constants/breadcrumb-routes';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-livwell-videos-listing',
  templateUrl: './livwell-videos-listing.component.html',
  styleUrls: ['./livwell-videos-listing.component.scss'],
  providers: [LivwellVideoService]
})
export class LivwellVideosListingComponent extends Pagination implements OnInit {
  filterForm: FormGroup;
  heading = [
    { heading: 'Video Title', key: 'title', sort: true, type: "link", link: `/${LIVWELL_VIDEOS}` },
    { heading: 'Category', key: 'categoryName' },
    { heading: 'Premium Content', key: 'isPremium', align: 'center' },
    { heading: 'Points for Deduction', key: 'points', align: 'center' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  subscriptions: Subscription[] = [];
  genericCategoryList = [];
  tempList = [];
  status = STATUS;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _video: LivwellVideoService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_LIVWELL_VIDEOS);
    this.permissionHandler();
    this.createForm();
    this.getVideoListing();
    this.getGenericCategoryList();
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryId: [''],
      status: [''],
      isPremium: [false]
    });
  }

  get f() { return this.filterForm.controls } //return form controls
  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.LIVWELL_VIDEOS);
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

  getGenericCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.generic,
      status: this.API_EVENT.active
    }
    this.subscriptions.push(
      this._common.getCategories(queryObj).subscribe(res => {
        if (res.statusCode === 200) {
          this.genericCategoryList = res.data;
        }
      })
    );
  }

  getVideoListing() {
    this.subscriptions.push(
      this._video.getVideoList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['title'] = titleCase(element.title.en);
          element['categoryName'] = titleCase(element.categoryId.name.en);
          element['isPremium'] = element.points > 0 ? 'Yes' : 'No';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addVideos(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${LIVWELL_VIDEOS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${LIVWELL_VIDEOS}/${EDIT}`, status.data._id]);
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
    this.getVideoListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getVideoListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addVideos(status);
        break;
      default:
        this.changeVideoStatus(status);
        break;
    }
  }

  changeVideoStatus(videoInfo: any) {
    const updateObj = {
      videoId: videoInfo.data._id,
      status: videoInfo.action
    };
    this._video.blockUnblockDeleteBanner(updateObj).subscribe(response => {
      if (videoInfo.action == this.API_EVENT.delete && (videoInfo.data.s_no > 1 && videoInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getVideoListing();
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
    this.getVideoListing();
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
