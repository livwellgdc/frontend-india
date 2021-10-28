import { PAYMENTS } from './../../../../../constants/routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../_service/payment.service';
import { Pagination } from '../../../../../constants/paginator';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_PAYMENTS } from '../../../../../constants/breadcrumb-routes';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { titleCase } from '../../../../../constants/helper';

@Component({
  selector: 'lv-payment-listing',
  templateUrl: './payment-listing.component.html',
  styleUrls: ['./payment-listing.component.scss'],
  providers: [PaymentService]
})
export class PaymentListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Transaction Id', key: 'transaction_id', type: "link", link: `/${PAYMENTS}` },
    { heading: 'User Name', key: 'uName' },
    { heading: 'Amount', key: 'amount', align: 'center' },
    { heading: 'Platform', key: 'platform', align: 'center' },
    { heading: "Created Date", key: "created", align: "center", type: 'date' },
    { heading: 'Subscription Validity', key: 'validity', align: 'center', type: "formatStatus" },
    { heading: "Current Subscription Status", key: "status", align: "center", type: "formatStatus" },
  ];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _table: TableService,
    private _payment: PaymentService,
    private _common: CommonService,
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PAYMENTS);
    this.getPaymentListing();
  }

  getPaymentListing() {
    this.subscriptions.push(
      this._payment.getPaymentList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['uName'] = element.userId && element.userId.fullName ? `${titleCase(element.userId.fullName)} (${element.userId.uid})` : '-';
          element['amount'] = `${element.currencySymbol}${element.amount}`;
          element['platform'] = element.platform === '1' ? 'Android' : 'iOS';
          element['validity'] = element.isExpire ? 'EXPIRED' : 'ACTIVE';
          element['userId'] = '';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
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
    this.getPaymentListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getPaymentListing();
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
