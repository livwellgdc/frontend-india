import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/constants/paginator';
import { AUDIT_LOG_BADGE_HISTORY, AUDIT_LOG_CHALANGES_HISTORY, AUDIT_LOG_HEALTH_HISTORY, AUDIT_LOG_LOGIN_HISTORY, AUDIT_LOG_POINT_HISTORY, AUDIT_LOG_REWARD_HISTORY } from 'src/app/constants/routes';
import { CommonService } from 'src/app/services/common/common.service';
import { slideInDownAnimation } from '../mat-table-renderer/filter-animation';

@Component({
  selector: 'lv-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  animations: [slideInDownAnimation]

})
export class ButtonGroupComponent extends Pagination implements OnInit {

  public ButtonGroupRouteStatus: string;
  private subscriptions: Subscription[] = [];

  @Input() public button_list: Button_KV[] = [
    { b_name: "Health History", b_value: this.API_EVENT.healthHistory },
    { b_name: "Reward History", b_value: this.API_EVENT.rewardHistory },
    { b_name: "Badge History", b_value: this.API_EVENT.badgeHistory },
    { b_name: "Point History", b_value: this.API_EVENT.pointHistory },
    { b_name: "Challenge History", b_value: this.API_EVENT.challengeHistory },
    { b_name: "Login History", b_value: this.API_EVENT.loginHistory }
  ];

  public isOpen = false;
  @Input() isFilterButtonVisible: boolean = false;
  @Input() isSearchBoxVisible: boolean = false;
  @Input() placeholder: string = "Search";

  
  constructor(private _router: Router, 
    private _actRoute: ActivatedRoute,
    private _common: CommonService,
    ) { super() }

  ngOnInit() {
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe((q: any) => {
        this.ButtonGroupRouteStatus = q && q.auditLogType ? q.auditLogType : this.API_EVENT.healthHistory;
      })
    );
  }

  @Input() notFound: string;
  @Output() open: EventEmitter<any> = new EventEmitter(); /*--filter open close--*/
  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Output() find: EventEmitter<any> = new EventEmitter();
  
  onClickButtonGroup(clickedStatus: string) {
    this.ButtonGroupRouteStatus = clickedStatus; 
    this.resetPages();
    if(clickedStatus ==  this.API_EVENT.healthHistory) {
      this._router.navigate([AUDIT_LOG_HEALTH_HISTORY], { queryParams: { auditLogType: this.API_EVENT.healthHistory}, relativeTo: this._actRoute.parent});
    } else if(clickedStatus ==  this.API_EVENT.rewardHistory) {
      this._router.navigate([AUDIT_LOG_REWARD_HISTORY], { queryParams: { auditLogType: this.API_EVENT.rewardHistory}, relativeTo: this._actRoute.parent});
    } else if(clickedStatus ==  this.API_EVENT.loginHistory) {
      this._router.navigate([AUDIT_LOG_LOGIN_HISTORY], { queryParams: { auditLogType: this.API_EVENT.loginHistory}, relativeTo: this._actRoute.parent});
    } else  if(clickedStatus ==  this.API_EVENT.pointHistory) {
      this._router.navigate([AUDIT_LOG_POINT_HISTORY], { queryParams: { auditLogType: this.API_EVENT.pointHistory}, relativeTo: this._actRoute.parent});
    }  else  if(clickedStatus ==  this.API_EVENT.challengeHistory) {
      this._router.navigate([AUDIT_LOG_CHALANGES_HISTORY], { queryParams: { auditLogType: this.API_EVENT.challengeHistory}, relativeTo: this._actRoute.parent});
    } else  if(clickedStatus ==  this.API_EVENT.badgeHistory) {
      this._router.navigate([AUDIT_LOG_BADGE_HISTORY], { queryParams: { auditLogType: this.API_EVENT.badgeHistory}, relativeTo: this._actRoute.parent});
    }
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

  tableFilter(isOpen: boolean) {
    this.isOpen = isOpen;
    this.open.emit(this.isOpen);
  }

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

  
searchTable(search: string) {
  this.find.emit(search);
  if (search == "") {
    this.notFoundErrorHandler(respond.added);
  } else {
    this.notFoundErrorHandler(respond.found);
  }
}

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
  }

}


export interface Button_KV  {
  b_name: string;
  b_value: string;
}


enum respond {
  added = "added",
  found = "found"
}

