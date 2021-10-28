import { Component, OnInit } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientClubService } from '../../_service/client-club.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_CLIENT_CLUBS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CLIENT_CLUBS, EDIT } from '../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-client-clubs-details',
  templateUrl: './client-clubs-details.component.html',
  styleUrls: ['./client-clubs-details.component.scss']
})
export class ClientClubsDetailsComponent extends Pagination implements OnInit {
  clientClubDetails: ClientClub.ClientClubData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  clientId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _clientClub: ClientClubService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CLIENT_CLUBS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.CLIENTS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['clientId'])) {
      this.clientId = this._actRoute.snapshot.params['clientId'];
      this.fetchClientClubDetails();
    }
  }

  fetchClientClubDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._clientClub.getClientClubDetail(this._actRoute.snapshot.params).subscribe((res: ClientClub.ClientClubDetail) => {
        this.isApiCallInProgress = false;
        this.clientClubDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CLIENT_CLUBS]);
        }
      })
    );
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${CLIENT_CLUBS}/${EDIT}`, this.clientClubDetails._id]);
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
