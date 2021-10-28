import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { BC_AUDIT_LOG_FILTER_STATUS } from '../../../../../constants/breadcrumb-routes';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common/common.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { AuditLogService } from '../services/audit-log.service';
import { DEVICE_TYPE } from 'src/app/constants/messages';


@Component({
  selector: 'lv-audit-log-list',
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.scss']
})
export class AuditLogListComponent extends Pagination implements OnInit, OnDestroy {

 public readonly heading = [ 
    { heading: 'Platform', key: 'platform', align: 'center' },
    { heading: 'LastLogin', key: 'lastLogin', type: 'date', align: 'center' },
  ];
  private subscriptions: Subscription[] = [];
  private tempListSubscription = null; // for discarding api calls on change tabs
  private userId: string;
  public filterForm: FormGroup;
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
      challangeStatus: ['']
    })
  }

  manageQueryParams() {
    
    this.subscriptions.push(
      this._actRoute.params.subscribe(q => {
        this.userId = q.userId;
        this._bc.setBreadcrumb(BC_AUDIT_LOG_FILTER_STATUS('Login History'));
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

  finallyGetAudiltLog() {
    let queryObj = {
      auditLogType: this.API_EVENT.loginHistory,
      userId: this.userId,
      ...this.validPageOptions
    };

    this.tempListSubscription = this._auditLog.getAuditLogs(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      if(response.data && response.data.length) {
        response.data.forEach(element => {
          element.platform = DEVICE_TYPE(element.platform);
        });
      }
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

  sortByListing(event: any) {
    this.sortOptions = event;
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
