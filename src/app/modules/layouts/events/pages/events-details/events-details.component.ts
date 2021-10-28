import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../_service/events.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_EVENTS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { EVENTS, EDIT } from '../../../../../constants/routes';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../../constants/paginator';

@Component({
  selector: 'lv-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss'],
  providers: [EventsService]
})
export class EventsDetailsComponent extends Pagination implements OnInit, OnDestroy {

  eventDetails: Event.EventData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _event: EventsService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_EVENTS_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.EVENTS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['eventId'])) {
      this.fetchEventDetails();
    }
  }

  fetchEventDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._event.getEventDetail(this._actRoute.snapshot.params).subscribe((res: Event.EventDetail) => {
        this.isApiCallInProgress = false;
        this.eventDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([EVENTS]);
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
      this._router.navigate([`${EVENTS}/${EDIT}`, this.eventDetails._id]);
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
