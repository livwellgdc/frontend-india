import { SPECIAL_OFFERS, ADD, EDIT } from './../../../../../constants/routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { STATUS } from '../../../../../constants/messages';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { SpecialOfferService } from '../../_service/special-offer.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_SPECIAL_OFFERS } from '../../../../../constants/breadcrumb-routes';
import { titleCase } from '../../../../../constants/helper';

@Component({
  selector: 'lv-offer-listing',
  templateUrl: './offer-listing.component.html',
  styleUrls: ['./offer-listing.component.scss'],
  providers: [SpecialOfferService]
})
export class OfferListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Offer Name', key: 'name', sort: true, type: "link", link: `/${SPECIAL_OFFERS}` },
    { heading: "Discount %", key: "discountPercent", align: "center" },
    { heading: "Quantity", key: "quantity", align: "center" },
    { heading: "Available Offer", key: "totalAvailableCoupons", align: "center" },
    { heading: "Validity", key: "validity", align: "center", type: 'date' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  tempList = [];
  filterForm: FormGroup;
  status = STATUS;
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _special: SpecialOfferService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_SPECIAL_OFFERS);
    this.createForm();
    this.getOfferListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: ['']
    })
  }

  getOfferListing() {
    this.subscriptions.push(
      this._special.getOfferList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addOffers(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${SPECIAL_OFFERS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${SPECIAL_OFFERS}/${EDIT}`, status.data._id]);
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
    this.getOfferListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getOfferListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addOffers(status); // Edit Offer
        break;
      default:
        this.changeOfferStatus(status);
        break;
    }
  }

  changeOfferStatus(offerInfo: any) {
    const updateObj = {
      discountId: offerInfo.data._id,
      status: offerInfo.action,
    };
    this._special.blockUnblockDeleteOffer(updateObj).subscribe(response => {
      if (offerInfo.action == this.API_EVENT.delete && (offerInfo.data.s_no > 1 && offerInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getOfferListing();
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
    this.getOfferListing();
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
