import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { MatTableRendererComponent } from 'src/app/components/mat-table-renderer/mat-table-renderer.component';
import { TableService } from 'src/app/components/mat-table-renderer/table.service';
import { BC_AUDIT_LOG_FILTER_STATUS } from 'src/app/constants/breadcrumb-routes';
import { CHALANGE_STATUS, CHALLENGE_TYPE, CHALLENGE_TYPE_OBJ } from 'src/app/constants/messages';
import { Pagination } from 'src/app/constants/paginator';
import { CommonService } from 'src/app/services/common/common.service';
import { AuditLogService } from '../services/audit-log.service';

@Component({
  selector: 'lv-audit-log-chalanges',
  templateUrl: './audit-log-chalanges.component.html',
  styleUrls: ['./audit-log-chalanges.component.scss']
})
export class AuditLogChalangesComponent extends Pagination implements OnInit, OnDestroy {

  public readonly heading = [ 
    { heading: 'Name', key: 'name', align: 'center' },
    { heading: 'Type', key: 'type', align: 'center' },
    { heading: 'Target', key: 'target', align: 'center' },
    { heading: 'Progress', key: 'progress', align: 'center' },
    { heading: 'FProgress', key: 'Ftotalprogress', align: 'center' },
    { heading: 'TProgress', key: 'Tprogress', align: 'center' },
    { heading: 'Start Date', key: 'startDate', type: 'date', align: 'center' },
    { heading: 'Start Time', key: 'startTime', type: 'time', align: 'center' },
    { heading: 'End Date', key: 'endDate', type: 'date', align: 'center' },
    { heading: 'End Time', key: 'completeTime', type: 'time', align: 'center' },
    { heading: 'Status', key: 'status', align: 'center' }
  ];
  private subscriptions: Subscription[] = [];
  public ButtonGroupRouteStatus: string;

  public filterForm: FormGroup;
  public status = CHALANGE_STATUS;

  
  private tempListSubscription = null; // for discarding api calls on change tabs
  private userId: string;
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
  
  manageQueryParams() {
    
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe((q: any) => {
        this.ButtonGroupRouteStatus = q && q.auditLogType ? q.auditLogType : this.API_EVENT.health;
      })
    );

    this.subscriptions.push(
      this._actRoute.params.subscribe(q => {
        this.userId = q.userId;
        this._bc.setBreadcrumb(BC_AUDIT_LOG_FILTER_STATUS('Chalanges'));
        this.getAuditLogListing();
      })
    );
  }

  createForm() {
    this.filterForm = this._fb.group({
      challangeStatus: ['']
    })
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
      auditLogType:  this.API_EVENT.challengeHistory,
      userId: this.userId,
      ...this.validPageOptions
    };

    this.tempListSubscription = this._auditLog.getAuditLogs(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      response.data.forEach(element => {
          if(element.type == CHALLENGE_TYPE_OBJ.STEPS) {

            element['progress'] = element.currentProgressStats.steps;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.steps;
            element['Tprogress'] = element.totalProgressStats.steps;

          } else if(element.type == CHALLENGE_TYPE_OBJ.KILOMETRES) {
            
            element['progress'] = element.currentProgressStats.distance;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.distance;
            element['Tprogress'] = element.totalProgressStats.distance;

          }else if(element.type == CHALLENGE_TYPE_OBJ.CHECK_IN_CLUB) {

            element['progress'] = element.currentProgressStats.clubCheckIn;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.clubCheckIn;
            element['Tprogress'] = element.totalProgressStats.clubCheckIn;

          }else if(element.type == CHALLENGE_TYPE_OBJ.CLASS_BOOKING) {

            element['progress'] = element.currentProgressStats.classBooking;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.classBooking;
            element['Tprogress'] = element.totalProgressStats.classBooking;

          }else if(element.type == CHALLENGE_TYPE_OBJ.CLASS_COMPLETED) {

            element['progress'] = element.currentProgressStats.classCompleted;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.classCompleted;
            element['Tprogress'] = element.totalProgressStats.classCompleted;

          }else if(element.type == CHALLENGE_TYPE_OBJ.VIDEO_CONTENT) {

            element['progress'] = element.currentProgressStats.videoContent;
            element['Ftotalprogress'] = element.currentFrequencyProgressStats.videoContent;
            element['Tprogress'] = element.totalProgressStats.videoContent;

          }
      });
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
