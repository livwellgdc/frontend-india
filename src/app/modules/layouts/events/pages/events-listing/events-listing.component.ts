import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EVENTS, ADD, EDIT } from '../../../../../constants/routes';
import { EventsService } from '../../_service/events.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { titleCase, dateToMs, isObjEmpty } from '../../../../../constants/helper';
import { Subscription } from 'rxjs';
import { BC_EVENTS_FILTER_STATUS } from '../../../../../constants/breadcrumb-routes';
import { CommonService } from '../../../../../services/common/common.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-events-listing',
  templateUrl: './events-listing.component.html',
  styleUrls: ['./events-listing.component.scss'],
  providers: [EventsService]
})
export class EventsListingComponent extends Pagination implements OnInit, OnDestroy {
  tempList = [];
  heading = [
    { heading: 'Image', key: 'image', type: 'img', align: 'center' },
    { heading: 'Event Name', key: 'name', content: true, sort: true, type: "link", link: `/${EVENTS}` },
    { heading: 'Category', key: 'categoryName' },
    { heading: "Start Date", key: "startTime", align: "center", type: 'date', sort: true },
    { heading: "End Date", key: "endTime", align: "center", type: 'date' },
    { heading: "Start Time", key: "startTime", align: "center", type: 'time' },
    { heading: "End Time", key: "endTime", align: "center", type: 'time' },
    { heading: "Status", key: "eventStatus", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 3] }
  ]

  filterForm: FormGroup;
  status = STATUS;
  categoryList = [];
  subscriptions: Subscription[] = [];
  tempListSubscription = null; // for discarding api calls on change tabs
  actRouteStatus: string = '';
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(private _bc: BreadcrumbService,
    private _table: TableService,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private _event: EventsService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.createForm();
    this.permissionHandler();
    this.getCategoryList();
    this.manageQueryParams();
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryId: [''],
      startTime: [],
      endTime: [],
      isFeatured: [false]
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.EVENTS);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading[this.heading.length - 1].action = this.removeAction([1]);
        }
        if (!permission.deleteBlock) {
          this.heading[this.heading.length - 1].action = this.removeAction([3]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  manageQueryParams() {
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe(q => {
        if (isObjEmpty(q)) {
          this.actRouteStatus = '';
          this._bc.setBreadcrumb(BC_EVENTS_FILTER_STATUS());
          this.getEventsListing();
        } else {
          this.actRouteStatus = q.eventStatus;
          switch (q.eventStatus) {
            case this.API_EVENT.ongoing:
              this._bc.setBreadcrumb(BC_EVENTS_FILTER_STATUS('Ongoing'));
              this.getEventsListing(q);
              break;
            case this.API_EVENT.upcoming:
              this._bc.setBreadcrumb(BC_EVENTS_FILTER_STATUS('Upcoming'));
              this.getEventsListing();
              break;
            case this.API_EVENT.expired:
              this._bc.setBreadcrumb(BC_EVENTS_FILTER_STATUS('Expired'));
              this.getEventsListing();
              break;
            default:
              this._router.navigate([EVENTS]);
              break;
          }
        }
      })
    );
  }

  getEventsListing(queries?) {
    if (this.tempListSubscription) {
      this.tempListSubscription.unsubscribe();
      this.finallyGetEvents(queries);
    } else {
      this.finallyGetEvents(queries);
    }
  }

  finallyGetEvents(queries?) {
    let queryObj = this.validPageOptions;
    this.actRouteStatus ? queryObj['eventStatus'] = this.actRouteStatus : queryObj;
    if (queries) {
      if ('fromDate' in queries) {
        this.f.startTime.setValue(new Date(Number(queries.fromDate)));
        queryObj['startTime'] = queries.fromDate;
        this.filterOptions = { startTime: queryObj['startTime'] }
        this.filterForm.markAsDirty();
      }
      if ('toDate' in queries) {
        this.f.endTime.setValue(new Date(Number(queries.toDate)));
        queryObj['endTime'] = queries.toDate;
        this.filterOptions = { endTime: queryObj['endTime'] }
        this.filterForm.markAsDirty();
      }
    }
    this.tempListSubscription = this._event.getEventsList(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      this.tempList = response.data;
      response.data.forEach(element => {
        element['categoryName'] = titleCase(element.categoryId.name.en);
        element['name'] = titleCase(element.name.en);
        element['sponsorName'] = titleCase(element.sponsorName);
      });
      this._table.tableRender(response);
    }, () => {
      this.tempListSubscription = null;
      this._table.tableRender({ data: [] });
    });
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.event,
      status: this.API_EVENT.active
    }
    this.subscriptions.push(
      this._common.getCategories(queryObj).subscribe(res => {
        if (res.statusCode === 200) {
          this.categoryList = res.data;
        }
      })
    );
  }

  addEvents(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${EVENTS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${EVENTS}/${EDIT}`, status.data._id]);
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
    this.getEventsListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getEventsListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addEvents(status);
        break;
      default:
        this.changeEventsStatus(status);
        break;
    }
  }

  eventStartDateChange() {
    this.f.endTime.setValue(null);
  }

  changeEventsStatus(eventInfo: any) {
    const updateObj = {
      eventId: eventInfo.data._id,
      status: eventInfo.action
    };
    this._event.blockUnblockDeleteEvents(updateObj).subscribe(response => {
      if (eventInfo.action == this.API_EVENT.delete && (eventInfo.data.s_no > 1 && eventInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getEventsListing();
      this._toast.success(response.message);
    });
  }

  getButtunGroupStatus(status: string) {
    this.resetPages();
    if (status == this.API_EVENT.all) {
      this._router.navigate([EVENTS]);
    } else {
      this._router.navigate([EVENTS], { queryParams: { eventStatus: status } });
    }
  }

  submitFilter(event: any) {
    if (!this.filterForm.dirty) { return };
    if (event.apply) {
      this.filterOptions = this.changeDateFormat(this.filterForm.value);
    } else {
      this.filterOptions = null;
      this.filterForm.reset();
    }
    this.resetPages();
    if (this.tableRef.paginator) {
      this.tableRef.paginator.firstPage();
    }
    this.getEventsListing();
  }

  changeDateFormat(obj: any) {
    obj.startTime = dateToMs(obj.startTime);
    obj.endTime = dateToMs(obj.endTime, true);
    return obj;
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
