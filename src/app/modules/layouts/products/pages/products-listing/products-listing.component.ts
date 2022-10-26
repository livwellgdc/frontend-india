import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { STATUS } from '../../../../../constants/messages';
import { ProductService } from '../../_service/product.service';
import { Pagination } from '../../../../../constants/paginator';
import { PRODUCTS, ADD, EDIT } from './../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_PRODUCTS } from '../../../../../constants/breadcrumb-routes';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { titleCase } from '../../../../../constants/helper';
import { ToastService } from '../../../../../components/toast-notification/toast.service';

@Component({
  selector: 'lv-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Product Name', key: 'name', content: true, sort: true, type: "link", link: `/${PRODUCTS}` },
    { heading: 'Product Price', key: 'price', align: "center", sort: true },
    { heading: "Product Discount", key: "discount", align: "center", sort: true },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 5] }
  ];
  filterForm: FormGroup;
  status = STATUS;
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _product: ProductService,
    private _toast: ToastService,
    private _table: TableService
    ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PRODUCTS);
    this.getProductListing();
    this.createForm();
  }

  getProductListing() {
    this.subscriptions.push(
      this._product.getProductList(this.validPageOptions).subscribe(response => {
        console.log(response);
        response.data.forEach(element => {
          element['name'] = titleCase(element.name.en);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  createForm() {
    this.filterForm = this._fb.group({
      productId: [''],
      classProductId: [''],
      status: ['']
    })
  }

  addProducts(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${PRODUCTS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${PRODUCTS}/${EDIT}`, status.data._id]);
    }
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addProducts(status); // Edit Category
        break;
      case 5:
        this.copyProduct(status.data);
        break;
      default:
        this.changeProductsStatus(status);
        break;
    }
  }

  copyProduct(rowData: any) {
    this._router.navigate([`${PRODUCTS}/${ADD}`], { queryParams: { copyProduct: rowData._id } });
  }

  changeProductsStatus(productInfo: any) {
    const updateObj = {
      productId: productInfo.data._id,
      status: productInfo.action,
    };
    this._product.blockUnblockDeleteProdct(updateObj).subscribe(response => {
      this.getProductListing();
      this._toast.success(response.message);
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
    this.getProductListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getProductListing();
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
    this.getProductListing();
  }

}
