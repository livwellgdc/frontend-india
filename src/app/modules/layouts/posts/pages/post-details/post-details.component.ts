import { Component, OnInit } from '@angular/core';
import { PostService } from '../../_service/post.service';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { BC_POSTS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { POSTS, EDIT } from '../../../../../constants/routes';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';

@Component({
  selector: 'lv-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  providers: [PostService]
})
export class PostDetailsComponent implements OnInit {

  postDetails: any;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _post: PostService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_POSTS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['postId'])) {
      this.fetchPostDetails();
    }
  }

  fetchPostDetails() {
    this.isApiCallInProgress = true;
    let queryObj = {
      ...this._actRoute.snapshot.params
    }
    this.subscriptions.push(
      this._post.getPostDetail(queryObj).subscribe((res: any) => {
        this.isApiCallInProgress = false;
        this.postDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([POSTS]);
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
    this._router.navigate([`${POSTS}/${EDIT}`, this.postDetails._id]);
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
