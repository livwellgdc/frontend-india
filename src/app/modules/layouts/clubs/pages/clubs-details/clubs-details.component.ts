import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../_service/club.service';
import { DATE_TYPES, PERMISSION, SECTION_ID_OF } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_CLUBS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CLUBS, EDIT, CLIENT_CLUBS } from '../../../../../constants/routes';
import html2Canvas from 'html2canvas';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-clubs-details',
  templateUrl: './clubs-details.component.html',
  styleUrls: ['./clubs-details.component.scss'],
  providers: [ClubService]
})
export class ClubsDetailsComponent extends Pagination implements OnInit {
  clubDetails: Club.ClubData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];
  elementType: 'url' | 'canvas' | 'img' = 'url';
  qrdata: string = null;
  qrCodeSrc = '';

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _club: ClubService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CLUBS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.CLUBS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['clubId'])) {
      this.fetchClubDetails();
    }
  }

  fetchClubDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._club.getClubDetail(this._actRoute.snapshot.params).subscribe((res: Club.ClubDetail) => {
        this.isApiCallInProgress = false;
        this.clubDetails = res.data;
        this.qrdata = this.clubDetails.qrCode;
        setTimeout(() => {
          this.qrCodeSrc = document.getElementsByTagName('img')[2].src;
        }, 0);
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CLUBS]);
        }
      })
    );
  }

  editHandler() {
    if (!this.permissionClass) {
      this._router.navigate([`${CLUBS}/${EDIT}`, this.clubDetails._id]);
    }
  }

  goToDetailPage() {
    this._router.navigate([`${CLIENT_CLUBS}`, this.clubDetails.clientId._id]);
  }

  downloadQrCode() {
    let data = document.getElementById('printMe');
    html2Canvas(data).then((canvas) => {
      let generatedImage = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      var a = document.createElement('a');
      a.href = generatedImage;
      a.download = `${this.clubDetails.shortName}.png`;
      a.click();
    })
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
