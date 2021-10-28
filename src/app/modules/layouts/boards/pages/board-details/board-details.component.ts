import { Component, OnInit } from '@angular/core';
import { DATE_TYPES } from '../../../../../constants/messages';
import { Subscription } from 'rxjs';
import { BC_BOARDS_DETAILS } from '../../../../../constants/breadcrumb-routes';
import { BOARDS, EDIT } from '../../../../../constants/routes';
import { ShowDescriptionComponent } from '../../../../../components/show-description/show-description.component';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../../../../services/common/common.service';
import { BoardService } from '../../_service/board.service';

@Component({
  selector: 'lv-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
  providers: [BoardService]
})
export class BoardDetailsComponent implements OnInit {
  boardDetails: Board.BoardData;
  isApiCallInProgress = false;
  dateType = DATE_TYPES;
  subscriptions: Subscription[] = [];

  constructor(
    private _bc: BreadcrumbService,
    private _actRoute: ActivatedRoute,
    private _board: BoardService,
    private _router: Router,
    private _toast: ToastService,
    private _common: CommonService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BOARDS_DETAILS);
    this.validateIdAndFetchDetails();
  }

  validateIdAndFetchDetails() {
    if (this._common.isValidId(this._actRoute.snapshot.params['boardId'])) {
      this.fetchBoardDetails();
    }
  }

  fetchBoardDetails() {
    this.isApiCallInProgress = true;
    let queryObj = {
      ...this._actRoute.snapshot.params
    }
    this.subscriptions.push(
      this._board.getBoardDetail(queryObj).subscribe((res: Board.BoardDetail) => {
        this.isApiCallInProgress = false;
        this.boardDetails = res.data;
      }, (error) => {
        this.isApiCallInProgress = false;
        if (error.statusCode == 400) {
          this._toast.error(error.message);
          this._router.navigate([BOARDS]);
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
    this._router.navigate([`${BOARDS}/${EDIT}`, this.boardDetails._id]);
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
