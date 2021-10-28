import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { BC_ARTICLES } from '../../../../../constants/breadcrumb-routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ARTICLES, ADD, EDIT } from '../../../../../constants/routes';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { ArticleService } from '../../_service/article.service';
import { Router } from '@angular/router';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../../../services/common/common.service';
import { Subscription } from 'rxjs';
import { SECTION_ID_OF } from '../../../../../constants/messages';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-articles-listing',
  templateUrl: './articles-listing.component.html',
  styleUrls: ['./articles-listing.component.scss'],
  providers: [ArticleService]
})
export class ArticlesListingComponent extends Pagination implements OnInit, OnDestroy {
  tempList = [];
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Article Title', key: 'title', sort: true, type: "link", link: `/${ARTICLES}` },
    { heading: 'Category', key: 'categoryName', align: 'center' },
    { heading: 'Author Name', key: 'authorName', align: 'center' },
    { heading: "Created Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  categoryList = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _table: TableService,
    private _toast: ToastService,
    private _article: ArticleService,
    private _router: Router,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_ARTICLES);
    this.permissionHandler();
    this.createForm();
    this.getCategoryList();
    this.getArticleListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryId: [''],
      isRecommended: [false]
    })
  }

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.ARTICLES);
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

  getArticleListing() {
    this.subscriptions.push(
      this._article.getArticleList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['categoryName'] = titleCase(element.categoryId.name.en);
          element['title'] = titleCase(element.title);
          element['authorName'] = titleCase(element.authorName);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.generic,
      status: this.API_EVENT.active
    }
    this.subscriptions.push(
      this._common.getCategories(queryObj).subscribe(res => {
        if (res.statusCode === 200) {
          this.categoryList = res.data;
        }
      })
    );
  }

  addArticles(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${ARTICLES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${ARTICLES}/${EDIT}`, status.data._id]);
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
    this.getArticleListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getArticleListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addArticles(status);
        break;
      default:
        this.changeArticleStatus(status);
        break;
    }
  }

  changeArticleStatus(articleInfo: any) {
    const updateObj = {
      articleId: articleInfo.data._id,
      status: articleInfo.action
    };
    this._article.blockUnblockDeleteArticle(updateObj).subscribe(response => {
      if (articleInfo.action == this.API_EVENT.delete && (articleInfo.data.s_no > 1 && articleInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getArticleListing();
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
    this.getArticleListing();
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
