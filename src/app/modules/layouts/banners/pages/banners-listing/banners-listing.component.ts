import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BANNERS, ADD, EDIT } from './../../../../../constants/routes';
import { BannerService } from '../../_service/banner.service';
import { Pagination } from '../../../../../constants/paginator';
import { TableService } from './../../../../../components/mat-table-renderer/table.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_BANNERS } from '../../../../../constants/breadcrumb-routes';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-banners-listing',
  templateUrl: './banners-listing.component.html',
  styleUrls: ['./banners-listing.component.scss'],
  providers: [BannerService]
})
export class BannersListingComponent extends Pagination implements OnInit {
  tempList = [];
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Banner Title', key: 'title', align: "center", sort: true, type: "link", link: `/${BANNERS}` },
    { heading: 'Banner Type', key: 'type' , align: "center",},
    { heading: "Created Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _table: TableService,
    private _toast: ToastService,
    private _banner: BannerService,
    private _router: Router,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BANNERS);
    this.permissionHandler();
    this.getBannerListing();
  }

  /**
  * @ROLE_MANAGEMENT
 */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.BANNERS);
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

  getBannerListing() {
    this.subscriptions.push(
      this._banner.getBannerList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['title'] = titleCase(element.title);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addBanners(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${BANNERS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${BANNERS}/${EDIT}`, status.data._id]);
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
    this.getBannerListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getBannerListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addBanners(status); // Edit Banner
        break;
      default:
        this.changeBannerStatus(status);
        break;
    }
  }

  changeBannerStatus(bannerInfo: any) {
    const updateObj = {
      bannerId: bannerInfo.data._id,
      status: bannerInfo.action
    };
    this._banner.deleteBanner(updateObj).subscribe(response => {
      if (bannerInfo.action == this.API_EVENT.delete && (bannerInfo.data.s_no > 1 && bannerInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getBannerListing();
      this._toast.success(response.message);
    });
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
