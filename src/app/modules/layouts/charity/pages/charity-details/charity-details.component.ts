import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { ShowDescriptionComponent } from 'src/app/components/show-description/show-description.component';
import { ToastService } from 'src/app/components/toast-notification/toast.service';
import { BC_CHARITY_DETAILS } from 'src/app/constants/breadcrumb-routes';
import { DATE_TYPES, SECTION_ID_OF } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { CHARITY, EDIT } from 'src/app/constants/routes';
import { CommonService } from 'src/app/services/common/common.service';
import { CharityService } from '../../_services/charity.service';

@Component({
  selector: 'lv-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.scss'],
  providers: [CharityService]
})
export class CharityDetailsComponent extends Pagination implements OnInit {

  public charityDetails: Charity.CharityData;
  public isApiCallInProgress = false;
  public dateType = DATE_TYPES;
  private subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _charity: CharityService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CHARITY_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.STORIES);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['charityId'])) {
      this.fetchCharityDetails();
    }
  }

  fetchCharityDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._charity.getCharityDetail(this._actRoute.snapshot.params).subscribe((res: Charity.CharityDetail) => {
        this.isApiCallInProgress = false;
        this.charityDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CHARITY]);
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
      this._router.navigate([`${CHARITY}/${EDIT}`, this.charityDetails._id]);
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
