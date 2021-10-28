import { CommonService } from './../../../../../services/common/common.service';
import { EDIT } from 'src/app/constants/routes';
import { FAQ } from './../../../../../constants/routes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { BC_FAQ_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { FaqService } from '../../_service/faq.service';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.scss'],
  providers: [FaqService]
})
export class FaqDetailsComponent extends Pagination implements OnInit, OnDestroy {
  faqDetails: Faq.FaqData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _faq: FaqService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_FAQ_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.FAQ);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['faqId'])) {
      this.fetchFaqDetails();
    }
  }

  fetchFaqDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._faq.getFaqDetails(this._actRoute.snapshot.params).subscribe((res: Faq.FaqDetail) => {
        this.isApiCallInProgress = false;
        this.faqDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([FAQ]);
        }
      })
    );
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${FAQ}/${EDIT}`, this.faqDetails._id]);
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
