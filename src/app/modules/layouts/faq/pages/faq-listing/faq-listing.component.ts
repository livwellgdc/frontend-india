import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { FaqService } from '../../_service/faq.service';
import { BC_FAQ } from '../../../../../constants/breadcrumb-routes';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { FAQ, ADD, EDIT } from './../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common/common.service';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { isObjEmpty } from '../../../../../constants/helper';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-faq-listing',
  templateUrl: './faq-listing.component.html',
  styleUrls: ['./faq-listing.component.scss'],
  providers: [FaqService]
})
export class FaqListingComponent extends Pagination implements OnInit, OnDestroy {
  heading = [
    { heading: "Question", key: "question", faqContent: true, type: "link", link: `/${FAQ}` },
    { heading: "Display Order", key: "position", align: "center" },
    { heading: "Created Date", key: "created", align: "center", type: 'date' },
    { heading: "Action", key: "status", type: "action", action: [1, 3] }
  ];
  tempList = [];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _table: TableService,
    private _faq: FaqService,
    private _toast: ToastService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_FAQ);
    this.permissionHandler();
    this.getFaqListing();
  }

  /**
 * @ROLE_MANAGEMENT
*/
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.FAQ);
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

  getFaqListing() {
    this.subscriptions.push(
      this._faq.getFaqList(this.pageParams).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['question'] = element.question && element.question.en ? element.question.en : '';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addFaq(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${FAQ}/${ADD}`]);
    }
    else {
      this._router.navigate([`${FAQ}/${EDIT}`, status.data._id]);
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
    this.getFaqListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getFaqListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addFaq(status);
        break;
      default:
        this.changeFaqStatus(status);
        break;
    }
  }

  changeFaqStatus(faqInfo: any) {
    const updateObj = {
      faqId: faqInfo.data._id
    };
    this._faq.deleteFaq(updateObj).subscribe(response => {
      if (faqInfo.action == this.API_EVENT.delete && (faqInfo.data.s_no > 1 && faqInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getFaqListing();
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
