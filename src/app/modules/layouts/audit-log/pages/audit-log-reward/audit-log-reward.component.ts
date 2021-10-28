import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { BC_AUDIT_LOG_FILTER_STATUS } from 'src/app/constants/breadcrumb-routes';
import { REWARD_HISTORY_TYPES, REWARD_TYPE } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { CommonService } from 'src/app/services/common/common.service';
import { AuditLogService } from '../services/audit-log.service';

@Component({
  selector: 'lv-audit-log-reward',
  templateUrl: './audit-log-reward.component.html',
  styleUrls: ['./audit-log-reward.component.scss']
})
export class AuditLogRewardComponent extends Pagination implements OnInit, OnDestroy {

  public ButtonGroupRouteStatus: string;

  public readonly heading = [ 
    { heading: 'Name', key: 'name', align: 'center' },
    { heading: 'Code', key: 'couponCode', align: 'center' },
    { heading: 'Reward Type', key: 'rewardType', align: 'center' },
    { heading: 'Status', key: 'type', align: 'center' },
    { heading: 'Validity', key: 'validity', type: 'date', align: 'center' },
    { heading: 'LWC', key: 'points', align: 'center' },
  ];
  private subscriptions: Subscription[] = [];
  private tempListSubscription = null; // for discarding api calls on change tabs
  private userId: string;
  public filterForm: FormGroup;
  public status = REWARD_TYPE;
  public rewatd_history_types = REWARD_HISTORY_TYPES;
  

  @ViewChild(MatTableRendererComponent, null) private tableRef: MatTableRendererComponent;


  constructor(
    private _bc: BreadcrumbService,
    private _table: TableService,
    private _auditLog: AuditLogService,
    private _actRoute: ActivatedRoute,
    private _common: CommonService,
    private _fb: FormBuilder
  ) { super() }

  ngOnInit() {
    this.createForm();
    this.manageQueryParams();
  }

  
  createForm() {
    this.filterForm = this._fb.group({
      rewardType: [''],
      rewardHistoryType: ['']
    })
  }

  manageQueryParams() {
    
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe((q: any) => {
        this.ButtonGroupRouteStatus = q && q.auditLogType ? q.auditLogType : this.API_EVENT.health;
      })
    );
    
    this.subscriptions.push(
      this._actRoute.params.subscribe(q => {
        this.userId = q.userId;
        this._bc.setBreadcrumb(BC_AUDIT_LOG_FILTER_STATUS('Reward'));
        this.getAuditLogListing();
      })
    );
  }

  getAuditLogListing() {

    if (this.tempListSubscription) {
      this.tempListSubscription.unsubscribe();
      this.finallyGetAudiltLog();
    } else {
      this.finallyGetAudiltLog();
    }
  }

  submitFilter(event: any) {
    if (!this.filterForm.dirty) { return };
    if (event.apply) {
      this.filterOptions = this.filterForm.value;
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getAuditLogListing();
  }

  finallyGetAudiltLog() {
    let queryObj = {
      auditLogType:  this.API_EVENT.rewardHistory,
      userId: this.userId,
      ...this.validPageOptions
    };

    this.tempListSubscription = this._auditLog.getAuditLogs(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      this._table.tableRender(response);
    }, () => {
      this.tempListSubscription = null;
      this._table.tableRender({ data: [] });
    });
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
    this.getAuditLogListing();
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
