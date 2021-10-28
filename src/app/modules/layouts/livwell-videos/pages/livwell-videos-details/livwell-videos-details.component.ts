import { Component, OnInit } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { LivwellVideoService } from '../../_service/livwell-video.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { BC_LIVWELL_VIDEOS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { LIVWELL_VIDEOS, EDIT } from '../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-livwell-videos-details',
  templateUrl: './livwell-videos-details.component.html',
  styleUrls: ['./livwell-videos-details.component.scss'],
  providers: [LivwellVideoService]
})
export class LivwellVideosDetailsComponent extends Pagination implements OnInit {
  videoDetails: LivwellVideo.LivwellVideoData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _video: LivwellVideoService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_LIVWELL_VIDEOS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.LIVWELL_VIDEOS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['videoId'])) {
      this.fetchVideoDetails();
    }
  }

  fetchVideoDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._video.getVideoDetail(this._actRoute.snapshot.params).subscribe((res: LivwellVideo.LivwellVideoDetail) => {
        this.isApiCallInProgress = false;
        this.videoDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([LIVWELL_VIDEOS]);
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
      this._router.navigate([`${LIVWELL_VIDEOS}/${EDIT}`, this.videoDetails._id]);
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
