import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SECTION_ID_OF, LISTING_COMMON_MESSAGES, FITNESS_REELS_STATUS, FITNESS_REELS_STATUS_LIST, FITNESS_REELS_REJECT_REASONS } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { ADD, EDIT, REELS } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_REELS } from '../../../../../constants/breadcrumb-routes';
import { isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { FitnessReelsService } from '../../_services/fitness-reels.service';
import { MatDialog } from '@angular/material';
import { VideoplayModalComponent } from 'src/app/components/videoplay-modal/videoplay-modal.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { FITNESS_REELS_REPORT_API } from 'src/app/constants/api-end-point';

@Component({
  selector: 'lv-fitness-reels-list',
  templateUrl: './fitness-reels-list.component.html',
  styleUrls: ['./fitness-reels-list.component.scss'],
  providers: [FitnessReelsService]
})
export class FitnessReelsListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'User Name', key: 'userName', align: 'center' },
    { heading: 'Uploaded', key: 'uploaded', align: 'center', type: "date" },

    { heading: 'Admin name', key: 'adminName', align: 'center' },
    { heading: 'UpdatedAt', key: 'updatedAt', align: 'center', type: "date" },

    { heading: 'Status', key: 'status', align: 'center' },
    { heading: 'Category', key: 'categoryIdValue', type: "selection", align: 'center' },
    { heading: 'Notes', key: 'notes', align: 'center' },

    { heading: 'Likes', key: 'likes', align: 'center', sort: true, },
    { heading: 'Shares', key: 'shares', align: 'center', sort: true, },
    { heading: 'Views', key: 'views', align: 'center', sort: true, },
    { heading: 'Action', key: 'status', type: 'action', action: [6, 7, 8] }
  ];
  private tempList = [];
  public filterForm: FormGroup;
  public status = FITNESS_REELS_STATUS_LIST;
  public FITNESS_REELS_REJECT_REASONS = FITNESS_REELS_REJECT_REASONS;
  private subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;
  isApiCallInProgress = {
    ofCategory: true,
    ofBadge: true
  }
  public categoryList = [];

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _fitnessReels: FitnessReelsService,
    private _common: CommonService,
    private _toast: ToastService,
    private _dialog: MatDialog,
  ) { super() }

  ngOnInit() {
    this.getCategoryList(this.API_EVENT.fitnessVideo);
    this._bc.setBreadcrumb(BC_REELS);
    // this.permissionHandler();
    this.createForm();
    this.getReelsListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
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
  private getReelsListing() {
    this.subscriptions.push(
      this._fitnessReels.getfitnessReelsList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['adminName'] = element.adminUser && element.adminUser.userName ? element.adminUser.userName : "";
          element['userName'] = element.uploadedUser && element.uploadedUser.userName ? element.uploadedUser.userName : "";
          element['uploaded'] = element.uploadedUser && element.uploadedUser.updatedAt ? element.uploadedUser.updatedAt : "";
          element['updatedAt'] = element.adminUser && element.adminUser.updatedAt ? element.adminUser.updatedAt : "";
          element['categoryIdValue'] = element.categoryId && element.categoryId._id ? element.categoryId._id : "";
        });
        this.tempList = response.data;
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  private getCategoryList(categoryType: string) {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: categoryType,
      status: this.API_EVENT.active
    }
    this._common.getCategories(queryObj).subscribe(res => {
      this.isApiCallInProgress.ofCategory = false;
      if (res.statusCode === 200) {
        this.categoryList = res.data;
        this.tableRef.categoryList = this.categoryList;
      }
    }, () => {
      this.isApiCallInProgress.ofCategory = false;
    })
  }

  addReels(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${REELS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${REELS}/${EDIT}`, status.data._id]);
    }
  }

  public categoryHandler(reelsData: any) {
    for (let find = 0; find < this.categoryList.length; find++) {
      if (reelsData.categoryId == this.categoryList[find]._id) {
        console.log(this.categoryList[find])
        let updateObj = {
          _id: this.categoryList[find]._id,
          name: this.categoryList[find].name,
          image: this.categoryList[find].image,
          status: this.categoryList[find].status
        }
        this._fitnessReels.updatefitnessReelsCategory({
          categoryId: updateObj,
          fitnessReelsId: reelsData.fitnessReelsId
        }).subscribe(response => {
          this._toast.success(response.message);
        });
        break;
      }
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
    this.getReelsListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getReelsListing();
  }

  changeStatus(fitnessReelData: any) {
    switch (fitnessReelData.id) {
      case 6:
        /*----open---*/
        let videoURL = fitnessReelData.data.video;
        if (fitnessReelData.data.isYoutubeVideo) {
          const videoId = fitnessReelData.data.video.split('=').pop();
          var newResult = fitnessReelData.data.video.substring(0, fitnessReelData.data.video.lastIndexOf("/"));
          videoURL = `${newResult}/embed/${videoId}`;
        }

        const dialog = this._dialog.open(VideoplayModalComponent, {

          data: {
            video: videoURL,
            isYoutubeVideo: fitnessReelData.data.isYoutubeVideo
          }
        });
        dialog.afterClosed().subscribe(result => { });
        break;

      case 7:
        const apprMessage = LISTING_COMMON_MESSAGES.APPROVE_MSG;
        const apprTitle = LISTING_COMMON_MESSAGES.APPROVE_TITLE;
        this.confirmationDialog(fitnessReelData, apprMessage, apprTitle);
        break;

      case 8:
        let message = LISTING_COMMON_MESSAGES.REJECT_MSG;
        let title = LISTING_COMMON_MESSAGES.REJECT_TITLE;
        this.confirmationDialog(fitnessReelData, message, title, this.FITNESS_REELS_REJECT_REASONS, "REJECT");
        break;
    }
  }

  confirmationDialog(fitnessReelData, message, title, reasons = [], listType = "") {
    /*----open---*/
    const dialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: title,
        message: message,
        reasons: reasons,
        listType: listType
      }
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        if (fitnessReelData.id == 7) {
          this.changeFitnessReelsStatus(fitnessReelData, FITNESS_REELS_STATUS.APPROVED, "success");
        } else if (fitnessReelData.id == 8) {
          this.changeFitnessReelsStatus(fitnessReelData, FITNESS_REELS_STATUS.REJECTED, result);
        }
      }
    });
  }


  private changeFitnessReelsStatus(fitnessReelData, status, notes) {
    const updateObj = {
      fitnessReelsId: fitnessReelData.data._id,
      status: status,
      notes: notes
    };
    this._fitnessReels.updatefitnessReels(updateObj).subscribe(response => {
      if ((fitnessReelData.data.s_no > 1 && fitnessReelData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getReelsListing();
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
    this.getReelsListing();
  }


  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(FITNESS_REELS_REPORT_API, obj);
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
