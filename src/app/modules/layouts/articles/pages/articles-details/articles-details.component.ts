import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../_service/article.service';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_ARTICLES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { ARTICLES, EDIT } from '../../../../../constants/routes';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.scss'],
  providers: [ArticleService]
})
export class ArticlesDetailsComponent extends Pagination implements OnInit, OnDestroy {
  articleDetails: Article.ArticleData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _article: ArticleService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_ARTICLES_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.ARTICLES);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['articleId'])) {
      this.fetchArticleDetails();
    }
  }

  fetchArticleDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._article.getArticleDetail(this._actRoute.snapshot.params).subscribe((res: Article.ArticleDetail) => {
        this.isApiCallInProgress = false;
        this.articleDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([ARTICLES]);
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

  copyLink(link: string) {
    this._common.copyToClipboard(link);
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${ARTICLES}/${EDIT}`, this.articleDetails._id]);
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
