import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATE_TYPES } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CATEGORY } from '../../../../../constants/routes';
import { BC_CATEGORIES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CategoryService } from '../../_service/category.service';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss'],
  providers: [CategoryService]
})
export class CategoriesDetailsComponent implements OnInit, OnDestroy {
  categoryDetails: Category.CategoryData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _category: CategoryService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CATEGORIES_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['categoryId'])) {
      this.fetchCategoryDetails();
    }
  }

  fetchCategoryDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._category.getCategoryDetails(this._actRoute.snapshot.params).subscribe((res: Category.CategoryDetail) => {
        this.isApiCallInProgress = false;
        this.categoryDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CATEGORY]);
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

  /**
  * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
  */
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}
