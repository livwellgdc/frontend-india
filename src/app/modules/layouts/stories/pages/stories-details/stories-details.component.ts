import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { BC_STORY_DETAILS } from 'src/app/constants/breadcrumb-routes';
import { DATE_TYPES, SECTION_ID_OF } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { EDIT, STORIES } from 'src/app/constants/routes';
import { CommonService } from 'src/app/services/common/common.service';
import { StoriesService } from '../../_services/stories.service';

@Component({
  selector: 'lv-stories-details',
  templateUrl: './stories-details.component.html',
  styleUrls: ['./stories-details.component.scss'],
  providers: [StoriesService]
})
export class StoriesDetailsComponent extends Pagination implements OnInit {

  public storyDetails: Story.StoryData;
  public isApiCallInProgress = false;
  public dateType = DATE_TYPES;
  private storyId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _story: StoriesService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_STORY_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.STORIES);
    this.validateIdAndFetchDetails();
  }

  private validateIdAndFetchDetails(): void {
    if (this._common.isValidId(this._actRoute.snapshot.params['storyId'])) {
      this.storyId = this._actRoute.snapshot.params['storyId'];
      this.fetchStoryDetails();
    }
  }

  private fetchStoryDetails(): void {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._story.getStoryDetail(this._actRoute.snapshot.params).subscribe((res: Story.StoryDetail) => {
        this.isApiCallInProgress = false;
        this.storyDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([STORIES]);
        }
      })
    );
  }


  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${STORIES}/${EDIT}`, this.storyDetails._id]);
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
