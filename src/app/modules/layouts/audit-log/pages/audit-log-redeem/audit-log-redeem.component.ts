import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { BC_AUDIT_LOG_FILTER_STATUS } from 'src/app/constants/breadcrumb-routes';
import { POINTS_EARNED_SPENDS_TYPE } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { CommonService } from 'src/app/services/common/common.service';
import { AuditLogService } from '../services/audit-log.service';

@Component({
  selector: 'lv-audit-log-redeem',
  templateUrl: './audit-log-redeem.component.html',
  styleUrls: ['./audit-log-redeem.component.scss']
})
export class AuditLogPointHistoryComponent extends Pagination implements OnInit, OnDestroy {

  public readonly heading = [ 
    { heading: 'Type', key: 'type', align: 'center' },
    { heading: 'Point Reward Type', key: 'rewardType', align: 'center' },
    { heading: 'LWC', key: 'points', type: "number", align: 'center' },
    { heading: 'created', key: 'created', type: "date", align: 'center' },
    { heading: 'Message', key: 'message', align: 'center' },
    { heading: 'Total LWC', key: 'totalLWCInWallet', type: 'number', align: 'center' },

  ];
  private subscriptions: Subscription[] = [];
  private tempListSubscription = null; // for discarding api calls on change tabs
  private userId: string;
  public filterForm: FormGroup;
  public status = POINTS_EARNED_SPENDS_TYPE;
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
      pointRewardType: ['']
    })
  }

  manageQueryParams() {
    
    this.subscriptions.push(
      this._actRoute.params.subscribe(q => {
        this.userId = q.userId;
        this._bc.setBreadcrumb(BC_AUDIT_LOG_FILTER_STATUS('LWC History'));
        this.getAuditLogListing();
      })
    );
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

  getAuditLogListing() {

    if (this.tempListSubscription) {
      this.tempListSubscription.unsubscribe();
      this.finallyGetAudiltLog();
    } else {
      this.finallyGetAudiltLog();
    }
  }

  finallyGetAudiltLog() {
    let queryObj = {
      auditLogType:  this.API_EVENT.pointHistory,
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
