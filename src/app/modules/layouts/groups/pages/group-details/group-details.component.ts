import { GROUPS } from './../../../../../constants/routes';
import { Component, OnInit } from '@angular/core';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { EDIT } from '../../../../../constants/routes';
import { GroupService } from '../../_service/group.service';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialog } from '@angular/material';
import { BC_GROUPS_DETAILS } from '../../../../../constants/breadcrumb-routes';

@Component({
  selector: 'lv-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  providers: [GroupService]
})
export class GroupDetailsComponent implements OnInit {
  groupDetails: Group.GroupData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  squadId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _group: GroupService,
    private _router: Router,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_GROUPS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['squadId'])) {
      this.squadId = this._actRoute.snapshot.params['squadId'];
      this.fetchGroupDetails();
    }
  }

  fetchGroupDetails() {
    this.isApiCallInProgress = true;
    this.subscriptions.push(
      this._group.getGroupDetail(this._actRoute.snapshot.params).subscribe((res: Group.GroupDetail) => {
        this.isApiCallInProgress = false;
        this.groupDetails = res.data;
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
    this._router.navigate([`${GROUPS}/${EDIT}`, this.groupDetails._id]);
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
