import { Component, OnInit, ViewChild } from '@angular/core';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import {  ADD, DEEP_LINKS, EDIT, SUBSCRIPTION_FETURES } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_SUBSCRIPTION_FEATURE } from '../../../../../constants/breadcrumb-routes';
import { isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { SubscriptionFeatureService } from '../../_services/subscription-feature.service';

@Component({
  selector: 'lv-subscription-features-list',
  templateUrl: './subscription-features-list.component.html',
  styleUrls: ['./subscription-features-list.component.scss'],
  providers: [SubscriptionFeatureService]
})
export class SubscriptionFeaturesListComponent extends Pagination implements OnInit {

  public heading = [
    { heading: 'Feature', key: 'feature',align: 'center', content: true },
    { heading: "ACTIVE", key: "ACTIVE", align: "center"},
    { heading: "MOVER", key: "MOVER", align: "center"},
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  private subscriptions: Subscription[] = [];
  private tempList = [];
  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _subscriptionFeature: SubscriptionFeatureService,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SUBSCRIPTION_FEATURE);
    this.permissionHandler();
    this.getFeaturesListing();
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.SUBSCRIPTION_FEATURES);
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

  public getFeaturesListing() {
    this.subscriptions.push(
      this._subscriptionFeature.getFeaturesList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element.featureConfig.forEach(innerElement => {
          element[innerElement.subscriptionPlanType] = innerElement.value.toString();
          });
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  public addFeature(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${SUBSCRIPTION_FETURES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${SUBSCRIPTION_FETURES}/${EDIT}`, status.data._id]);
    }
  }

  public paginationWithSearch(ev: any, id: number) {
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
    this.getFeaturesListing();
  }

  public sortByListing(event: any) {
    this.sortOptions = event;
    this.getFeaturesListing();
  }

  public changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addFeature(status); 
        break;
      default:
        this.changeSubscriptionFeatureStatus(status);
        break;
    }
  }

  private changeSubscriptionFeatureStatus(SubscriptionFeatureData: any) {
   const updateObj = {
    subscriptionFeatureId: SubscriptionFeatureData.data._id,
      status: SubscriptionFeatureData.action,
    };
    this._subscriptionFeature.deleteFeature(updateObj).subscribe(response => {
      if (SubscriptionFeatureData.action == this.API_EVENT.delete && (SubscriptionFeatureData.data.s_no > 1 && SubscriptionFeatureData.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getFeaturesListing();
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
