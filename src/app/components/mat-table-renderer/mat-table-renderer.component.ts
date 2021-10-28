import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Pagination } from '../../constants/paginator';
import { TableService } from './table.service';
import { StorageService } from '../../services/storage/storage.service';
import { slideInDownAnimation } from './filter-animation';
import { LISTING_COMMON_MESSAGES, DATE_TYPES, NO_ACTION } from '../../constants/messages';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../toast-notification/toast.service';
import { CommonService } from '../../services/common/common.service';
import { ShowCouponCodesComponent } from '../show-coupon-codes/show-coupon-codes.component';

const ELEMENT_DATA = [];

@Component({
  selector: 'mat-table-renderer',
  templateUrl: './mat-table-renderer.component.html',
  styleUrls: ['./mat-table-renderer.component.scss'],
  animations: [slideInDownAnimation]
})
export class MatTableRendererComponent extends Pagination implements OnInit, OnDestroy {
  isOpen = false;
  matHeaderRow: any = [];
  notData: boolean = false;
  length: 0;
  pageSize: 10;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subscriptions: Subscription[] = [];
  dateType = DATE_TYPES;
  ButtonGroupRouteStatus: string;
  totalPointsOfHistory: number = 0;
  showLoader = false;

  @Input() permissionId: number = -1;
  @Output() sendMail: EventEmitter<any> = new EventEmitter();
  @Input() addUrboxButton: boolean = false;
  @Input() addSendMailBtn: boolean = false;
  @Input() pageType;
  @Input() isButtonGroup: boolean = false;
  @Input() isCategoryButtonGroup: boolean = false;
  @Input() isShowEndedButton: boolean = true;
  @Input() openFilter: boolean = false;
  @Input() cls: string;
  @Input() addCustomClass: string = 'removeExportBtn';
  @Input() heading: any = [];
  @Input() notFound: string;
  @Input() removeId: number = -1;
  @Input() placeholder: string = "Search";
  @Input() listType: string = '';
  @Output() page: EventEmitter<any> = new EventEmitter();
  @Output() find: EventEmitter<any> = new EventEmitter();
  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() status: EventEmitter<any> = new EventEmitter();
  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Output() open: EventEmitter<any> = new EventEmitter(); /*--filter open close--*/
  @Output() export: EventEmitter<any> = new EventEmitter();
  @Output() buttonGroupStatus: EventEmitter<any> = new EventEmitter();
  @ViewChild('paginator', null) paginator: MatPaginator;
  @Output() checkbox: EventEmitter<any> = new EventEmitter();
  @Input() categoryList = [];
  @Output() category: EventEmitter<any> = new EventEmitter();

  constructor(
    private _table: TableService,
    private _dialog: MatDialog,
    public storage: StorageService,
    private _actRoute: ActivatedRoute,
    private _toast: ToastService,
    private _common: CommonService
  ) { super(); }

  ngOnInit() {
    //For Button Group Action
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe((q: any) => {
        this.showLoader = true;
        this.dataSource = new MatTableDataSource([]);
        this.length = 0;
        this.pageSize = 10;
        if (q.classStatus) {
          this.ButtonGroupRouteStatus = q.classStatus;
        } else if (q.eventStatus) {
          this.ButtonGroupRouteStatus = q.eventStatus;
        } else if (q.categoryType) {
          this.ButtonGroupRouteStatus = q.categoryType;
        } else {
          this.ButtonGroupRouteStatus = this.API_EVENT.all;
        }
      })
    );

    this.matHeaderRow.push("#");
    this.heading.forEach(item => {
      this.matHeaderRow.push(item.heading);
    });
    this.heading.push({ heading: "#", key: "s_no" });
    this.TableDatObserve();
    this.notFoundErrorHandler(respond.added);
  }

  TableDatObserve() {
    this.subscriptions.push(
      this._table.tableObserve.subscribe((response: any) => {
        this.showLoader = false;
        response.data.forEach((list, index) => {
          list["s_no"] = response.limit * (response.pageNo - 1) + (index + 1);
        });
        if ('totalPoints' in response) {
          this.totalPointsOfHistory = response.totalPoints;
        } else {
          this.totalPointsOfHistory = 0;
        }
        this.dataSource = new MatTableDataSource(response.data);
        this.length = response.total;
        this.pageSize = response.limit;
        if (response.data.length == 0) {
          this.notData = true;
        } else {
          this.notData = false;
        }
      }, () => {
        this.showLoader = false;
      })
    );
  }

  public categoryHandler(categoryId: string, fitnessReelsId: string) {
    this.category.emit({ categoryId: categoryId, fitnessReelsId: fitnessReelsId })
  }
  /**
   * @param text common not found text handel
   */
  notFoundErrorHandler(text: string) {
    if (this.notFound) {
      const notFoundText = this.notFound.split(" ");
      if (notFoundText[notFoundText.length - 1].toLowerCase() == respond.added || notFoundText[notFoundText.length - 1].toLowerCase() == respond.found) {
        notFoundText[notFoundText.length - 1] = text;
        this.notFound = notFoundText.join(" ");
      }
    }
  }

  onClickButtonGroup(clickedStatus: string) {
    this.buttonGroupStatus.emit(clickedStatus);
  }

  onPageHandler(ev: any) {
    this.page.emit(ev);
  }

  searchTable(search: string) {
    this.find.emit(search);
    if (search == "") {
      this.notFoundErrorHandler(respond.added);
    } else {
      this.notFoundErrorHandler(respond.found);
    }
  }

  addListing(status: number, data?: any) {
    /*--0=add, +1=edit--*/
    this.add.emit({ id: status, data: data });
  }

  sendSelesReport() {
    this.sendMail.emit();
  }

  exportList() {
    this.export.emit(true);
  }

  sortingData(event) {
    for (let find = 0; find < this.heading.length; find++) {
      if (this.heading[find].heading == event.active) {
        event.active = this.heading[find].key;
        break;
      }
    }
    this.sort.emit(event);
  }

  changeStatus(id: number, data: any, index: any, listType?) {

    const body = {
      id: id,
      index: index,
      data: data
    };
    switch (id) {
      case 1:
        if ('isEdited' in body.data) {
          if (body.data.isEdited) {
            this.status.emit(body); // for class actions
          } else {
            this._toast.error(NO_ACTION);
          }
        } else {
          this.status.emit(body); // for all list edit
        }
        break;

      case 4:
        if (!body.data.isClassEnd || body.data.classStatus == this.API_EVENT.ended || body.data.classStatus == this.API_EVENT.expired) {
          this._toast.error(NO_ACTION);
        } else {
          this.status.emit(body); // for class end action
        }
        break;

      case 5:
        this.status.emit(body); // for class copy action
        break;

      case 6:
      case 7:
      case 8:
        this.status.emit(body); // for video play action
        break;

      default:
        if ('isEdited' in body.data) {
          if (body.data.isEdited && body.data.status !== this.API_EVENT.expired) {
            this.confirmationDialog(id, body, listType);  // default class actions
          } else {
            this._toast.error(NO_ACTION);
          }
        } else {
          if (body.data.status !== this.API_EVENT.expired) {
            this.confirmationDialog(id, body, listType); // default for all list
          } else {
            this._toast.error(NO_ACTION);
          }
        }
        break;
    }
  }

  public switchBooleanValue(element) {
    const dialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: element.isDealsOfTheDay ? LISTING_COMMON_MESSAGES.INACTIVATE_TITLE : LISTING_COMMON_MESSAGES.ACTIVATE_TITLE,
        message: element.isDealsOfTheDay ? LISTING_COMMON_MESSAGES.INACTIVATE_CHECKBOX_MSG : LISTING_COMMON_MESSAGES.ACTIVATE_CHECKBOX_MSG
        // listType: (body.action == this.API_EVENT.block || body.action == this.API_EVENT.delete) ? this.listType : ''
      }
    });
    dialog.afterClosed().subscribe(result => {
      console.log(element)
      console.log(result)
      if (result) {
        const updateObj = {
          rewardId: element._id,
          isDealsOfTheDay: element.isDealsOfTheDay,
        };
        this.checkbox.emit(updateObj)
      } else {
        element.isDealsOfTheDay = element.isTempDealsOfTheDay;
      }
    });
  }

  tableFilter(isOpen: boolean) {
    this.isOpen = isOpen;
    this.open.emit(this.isOpen);
  }

  confirmationDialog(id: number, body: any, listType?) {
    let message = LISTING_COMMON_MESSAGES.DELETE_MSG;
    let title = LISTING_COMMON_MESSAGES.DELETE_TITLE;
    body["action"] = this.API_EVENT.delete;
    if (id == 2) {
      if (body.data.status == this.API_EVENT.active) {
        message = listType == 'User' ? LISTING_COMMON_MESSAGES.BLOCK_MSG : LISTING_COMMON_MESSAGES.INACTIVATE_MSG;
        title = listType == 'User' ? LISTING_COMMON_MESSAGES.BLOCK_TITLE : LISTING_COMMON_MESSAGES.INACTIVATE_TITLE;
        body["action"] = this.API_EVENT.block;
      } else {
        message = listType == 'User' ? LISTING_COMMON_MESSAGES.ACTIVE_MSG : LISTING_COMMON_MESSAGES.ACTIVATE_MSG;
        title = listType == 'User' ? LISTING_COMMON_MESSAGES.ACTIVE_TITLE : LISTING_COMMON_MESSAGES.ACTIVATE_TITLE;
        body["action"] = this.API_EVENT.active;
      }
    }
    /*----open---*/
    const dialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: title,
        message: message,
        listType: (body.action == this.API_EVENT.block || body.action == this.API_EVENT.delete) ? this.listType : ''
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.status.emit(body);
      }
    });
  }

  /*---------------------------FILTER OPTIONS--------------------*/
  applyFilter(event) {
    if (event.apply == null) {
      this.notFoundErrorHandler(respond.added);
      this.tableFilter(false);
    } else {
      if (event.apply) {
        this.notFoundErrorHandler(respond.found);
      } else {
        this.notFoundErrorHandler(respond.added);
      }
      this.tableFilter(false);
      this.filter.emit(event);
    }
  }

  seeAllMemberShips(membershipArray) {
    if (membershipArray.length > 1) {
      this._dialog.open(ShowCouponCodesComponent, {
        data: {
          isShowMemberShip: true,
          membershipArray: membershipArray
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

enum respond {
  added = "added",
  found = "found"
}
