import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { PostService } from '../../_service/post.service';
import { Subscription } from 'rxjs';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { POSTS, ADD, EDIT } from '../../../../../constants/routes';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_POSTS } from '../../../../../constants/breadcrumb-routes';
import { titleCase } from '../../../../../constants/helper';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lv-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.scss'],
  providers: [PostService]
})
export class PostListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Post Title', key: 'name', sort: true, type: "link", link: `/${POSTS}` },
    { heading: "Board", key: "boardName", align: "center" },
    { heading: "Created On", key: "created", align: "center", type: 'date' },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ];
  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  tempList = [];
  boardList = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _post: PostService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_POSTS);
    this.createForm();
    this.getBoards();
    this.getPostListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      boardId: ['']
    })
  }

  getBoards() {
    this._post.getBoardList().subscribe(res => {
      if (res && res.statusCode == 200) {
        this.boardList = res.data;
      }
    })
  }

  getPostListing() {
    this.subscriptions.push(
      this._post.getPostList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['name'] = titleCase(element.name);
          element['boardName'] = titleCase(element.boardId.name);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addPosts(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${POSTS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${POSTS}/${EDIT}`, status.data._id]);
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
    this.getPostListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getPostListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addPosts(status); // Edit POSTS
        break;
      default:
        this.deletePosts(status);
        break;
    }
  }

  deletePosts(postInfo: any) {
    const updateObj = {
      postId: postInfo.data._id
    };
    this._post.deletePost(updateObj).subscribe(response => {
      if (postInfo.action == this.API_EVENT.delete && (postInfo.data.s_no > 1 && postInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getPostListing();
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
    this.getPostListing();
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
