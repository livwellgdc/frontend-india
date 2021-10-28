import { Component, OnInit } from '@angular/core';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { VERSIONS } from '../../../../../constants/routes';
import { BC_VERSIONS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { VersionService } from '../../_service/version.service';

@Component({
  selector: 'lv-versions-details',
  templateUrl: './versions-details.component.html',
  styleUrls: ['./versions-details.component.scss'],
  providers: [VersionService]
})
export class VersionsDetailsComponent implements OnInit {
  versionDetails: Version.VersionData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _version: VersionService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_VERSIONS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['versionId'])) {
      this.fetchVersionDetails();
    }
  }

  fetchVersionDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._version.getVersionDetails(this._actRoute.snapshot.params).subscribe((res: Version.VersionDetail) => {
        this.isApiCallInProgress = false;
        this.versionDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([VERSIONS]);
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
