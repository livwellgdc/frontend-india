import { BOARDS, EDIT } from './../../../../../constants/routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '../../_service/board.service';
import { CommonService } from '../../../../../services/common/common.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../../constants/paginator';
import { BC_BOARDS } from '../../../../../constants/breadcrumb-routes';
import { titleCase } from '../../../../../constants/helper';
import { ADD } from '../../../../../constants/routes';

@Component({
  selector: 'lv-board-listing',
  templateUrl: './board-listing.component.html',
  styleUrls: ['./board-listing.component.scss'],
  providers: [BoardService]
})
export class BoardListingComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Board Name', key: 'name', sort: true, type: "link", link: `/${BOARDS}` },
    { heading: "Created On", key: "created", align: "center", type: 'date' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2] }
  ];
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _router: Router,
    private _toast: ToastService,
    private _table: TableService,
    private _board: BoardService,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_BOARDS);
    this.getBoardListing();
  }

  getBoardListing() {
    this.subscriptions.push(
      this._board.getBoardList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['name'] = titleCase(element.name.en);
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addBoards(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${BOARDS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${BOARDS}/${EDIT}`, status.data._id]);
    }
  }

  paginationWithSearch(ev: any, id: number) {
    switch (id) {
      case 0:
        this.resetPages();
        this.search = ev;
        if (this.tableRef.paginator) {
          this.tableRef.paginator.firstPage();
        }
        break;
      default:
        this.pageOptionsOnChange = ev;
        break;
    }
    this.getBoardListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getBoardListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addBoards(status); // Edit Boards
        break;
      default:
        this.changeBoardStatus(status);
        break;
    }
  }

  changeBoardStatus(boardInfo: any) {
    const updateObj = {
      boardId: boardInfo.data._id,
      status: boardInfo.action,
    };
    this._board.blockUnblockBoard(updateObj).subscribe(response => {
      this.getBoardListing();
      this._toast.success(response.message);
    });
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
