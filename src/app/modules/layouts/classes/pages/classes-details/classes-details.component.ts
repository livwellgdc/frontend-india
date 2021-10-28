import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { DATE_TYPES, SECTION_ID_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../_service/class.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_CLASSES_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { CLASSES, EDIT } from '../../../../../constants/routes';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { CLUBS } from './../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { ShowImageComponent } from '../../../../../components/show-image/show-image.component';
import { SeatsArrangementComponent } from '../../../../../components/seats-arrangement/seats-arrangement.component';

@Component({
  selector: 'lv-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.scss'],
})
export class ClassesDetailsComponent extends Pagination implements OnInit, OnDestroy {
  classDetails: Class.ClassData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  classId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _class: ClassService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CLASSES_DETAILS);
    this.permissionClass = this._common.editPermissionHandler(SECTION_ID_OF.CLASSES);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['classId'])) {
      this.classId = this._actRoute.snapshot.params['classId'];
      this.fetchClassDetails();
    }
  }

  fetchClassDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._class.getClassDetail(this._actRoute.snapshot.params).subscribe((res: Class.ClassDetail) => {
        this.isApiCallInProgress = false;
        this.classDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([CLASSES]);
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
    if (!this.permissionClass) {
      this._router.navigate([`${CLASSES}/${EDIT}`, this.classDetails._id]);
    }
  }

  openSeatBox() {
    this._dialog.open(SeatsArrangementComponent, {
      data: { seatArray: this.classDetails.seats, isSeatRemovalOption: false },
      disableClose: false
    });
  }

  viewSeatMapImage() {
    this._dialog.open(ShowImageComponent, {
      data: { image: this.classDetails.seatMapImage }
    });
  }

  goToDetailPage() {
    this._router.navigate([`${CLUBS}`, this.classDetails.clubId._id]);
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
