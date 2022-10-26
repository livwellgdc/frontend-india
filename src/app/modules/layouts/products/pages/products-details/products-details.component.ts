import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { Pagination } from '../../../../../constants/paginator';
import { CommonService } from '../../../../../services/common/common.service';
import { BreadcrumbService } from './../../../../../components/breadcrumb/breadcrumb.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ProductService } from '../../_service/product.service';
import { BC_PRODUCTS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { PRODUCTS, EDIT } from 'src/app/constants/routes';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent extends Pagination implements OnInit, OnDestroy {
  productDetails: Product.ProductData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  productId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _product: ProductService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PRODUCTS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.PRODUCTS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['productId'])) {
      this.productId = this._actRoute.snapshot.params['productId'];
      this.fetchProductDetails();
    }
  }

  fetchProductDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._product.getProductDetail(this._actRoute.snapshot.params).subscribe((res: Product.ProductDetail) => {
        this.isApiCallInProgress = false;
        this.productDetails = res.data;
        console.log(this.productDetails);
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([PRODUCTS]);
        }
      })
    );
  }

  openDescriptionBox(title: string, description: string) {
    if (description) {
      this._dialog.open(ShowDescriptionComponent, {
        data: {
          title: title,
          description: description
        }
      })
    }
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${PRODUCTS}/${EDIT}`, this.productDetails._id]);
    }
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
