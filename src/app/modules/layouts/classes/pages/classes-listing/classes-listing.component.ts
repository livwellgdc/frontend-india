import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from '../../_service/class.service';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../../constants/paginator';
import { STATUS, CLASS_TYPE, SECTION_ID_OF, CLASS_CREATED_BY } from '../../../../../constants/messages';
import { CLASSES, ADD, EDIT } from '../../../../../constants/routes';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { EnterReasonComponent } from '../../../../../components/enter-reason/enter-reason.component';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../../../../services/common/common.service';
import { BC_CLASSES_FILTER_STATUS } from '../../../../../constants/breadcrumb-routes';
import { titleCase, dateToMs, isObjEmpty, formatClassType, isReadyToEndClass } from '../../../../../constants/helper';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-classes-listing',
  templateUrl: './classes-listing.component.html',
  styleUrls: ['./classes-listing.component.scss'],
  providers: [ClassService]
})
export class ClassesListingComponent extends Pagination implements OnInit, OnDestroy {

  heading = [
    { heading: 'Class Name', key: 'name', content: true, sort: true, type: "link", link: `/${CLASSES}` },
    { heading: 'Category', key: 'categoryName' },
    { heading: 'Club', key: 'shortName', align: 'center' },
    { heading: 'Class Type', key: 'type', align: 'center' },
    { heading: 'Class Date', key: 'startTime', align: 'center', type: 'date', sort: true },
    { heading: 'Start Time', key: 'startTime', align: 'center', type: 'time' },
    { heading: 'End Time', key: 'endTime', align: 'center', type: 'time' },
    { heading: 'Seats Booked', key: 'activeParticipant', align: 'center' },
    { heading: 'Class Created By', key: 'classType', align: 'center' },
    { heading: "Class Status", key: "classStatus", align: "center", type: 'formatStatus' },
    { heading: "Status", key: "status", align: "center", type: 'formatStatus' },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 4, 5] }
  ];
  filterForm: FormGroup;
  status = STATUS;
  classType = CLASS_TYPE;
  classCreatedBy = CLASS_CREATED_BY;
  clubList = [];
  categoryList = [];
  subscriptions: Subscription[] = [];
  tempListSubscription = null; // for discarding api calls on change tabs
  actRouteStatus: string = '';
  isClubCallInProgress = false;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _table: TableService,
    private _toast: ToastService,
    private _class: ClassService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _common: CommonService
  ) { super() }

  ngOnInit() {
    this.permissionHandler();
    this.createForm();
    this.manageQueryParams();
    this.getCategoryList();
    this.getClubListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      classType: [''],
      status: [''],
      type: [''],
      categoryId: [''],
      clubId: [''],
      startTime: [],
      endTime: [],
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CLASSES);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit && !permission.deleteBlock) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice((this.heading.length - 1), 1);
      } else {
        if (!permission.addEdit) {
          this.permissionClass = 'removeAddButton';
          this.heading[this.heading.length - 1].action = this.removeAction([1, 5]);
        }
        if (!permission.deleteBlock) {
          this.heading[this.heading.length - 1].action = this.removeAction([2, 4]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  patchValues(queryParamsObj, inFromDate = true, inToDate = true) {
    if (inFromDate) {
      this.f.startTime.setValue(new Date(Number(queryParamsObj.fromDate)));
    }
    if (inToDate) {
      this.f.endTime.setValue(new Date(Number(queryParamsObj.toDate)));
    }
    this.filterOptions = queryParamsObj;
    this.filterForm.markAsDirty();
  }


  manageQueryParams() {
    this.subscriptions.push(
      this._actRoute.queryParams.subscribe(q => {
        if (isObjEmpty(q)) {
          this.actRouteStatus = '';
          this._bc.setBreadcrumb(BC_CLASSES_FILTER_STATUS());
          this.getClassListing();
        } else {
          this.actRouteStatus = q.classStatus;
          switch (q.classStatus) {
            case this.API_EVENT.ongoing:
              this._bc.setBreadcrumb(BC_CLASSES_FILTER_STATUS('Ongoing'));
              this.getClassListing(q);
              break;
            case this.API_EVENT.upcoming:
              this._bc.setBreadcrumb(BC_CLASSES_FILTER_STATUS('Upcoming'));
              this.getClassListing();
              break;
            case this.API_EVENT.ended:
              this._bc.setBreadcrumb(BC_CLASSES_FILTER_STATUS('Ended'));
              this.getClassListing();
              break;
            case this.API_EVENT.expired:
              this._bc.setBreadcrumb(BC_CLASSES_FILTER_STATUS('Expired'));
              this.getClassListing();
              break;
            default:
              this._router.navigate([CLASSES]);
              break;
          }
        }
      })
    );
  }

  getClassListing(queries?) {
    if (this.tempListSubscription) {
      this.tempListSubscription.unsubscribe();
      this.finallyGetClasses(queries);
    } else {
      this.finallyGetClasses(queries);
    }
  }

  finallyGetClasses(queries?) {
    let queryObj = this.validPageOptions;
    this.actRouteStatus ? queryObj['classStatus'] = this.actRouteStatus : queryObj;
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
    this.tempListSubscription = this._class.getClassList(queryObj).subscribe(response => {
      this.tempListSubscription = null;
      response.data.forEach(element => {
        element['categoryName'] = element.categoryId && element.categoryId.name ? titleCase(element.categoryId.name.en) : '';
        element['name'] = titleCase(element.name);
        element['shortName'] = (element.clubId && element.clubId.shortName) ? element.clubId.shortName : '';
        element['type'] = formatClassType(element.type);
        element['isClassEnd'] = isReadyToEndClass(element.startTime, 15);
      });
      this._table.tableRender(response);
    }, () => {
      this.tempListSubscription = null;
      this._table.tableRender({ data: [] });
    });
  }


  addClasses(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CLASSES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CLASSES}/${EDIT}`, status.data._id]);
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
    this.getClassListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getClassListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addClasses(status);
        break;
      case 4:
        this.endClass(status.data);
        break;
      case 5:
        this.copyClass(status.data);
        break;
      default:
        this.changeClassStatus(status);
        break;
    }
  }

  copyClass(rowData: any) {
    this._router.navigate([`${CLASSES}/${ADD}`], { queryParams: { copyClass: rowData._id } });
  }

  endClass(rowData: any) {
    const dialogRef = this._dialog.open(EnterReasonComponent, {
      width: "600px",
      autoFocus: false,
      disableClose: true,
      data: { label: 'Ending the Class', placeholder: 'ending the class' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let bodyofReason = {
          classId: rowData._id,
          status: this.API_EVENT.ended,
          ...result
        };
        this.confirmStatus(bodyofReason);
      }
    });
  }

  changeClassStatus(classInfo: any) {
    const updateObj = {
      classId: classInfo.data._id,
      status: classInfo.action
    };
    this.confirmStatus(updateObj);
  }

  confirmStatus(body: any) {
    this._class.blockUnblockDeleteClass(body).subscribe(response => {
      this.getClassListing();
      this._toast.success(response.message);
    });
  }

  getClubListing(searchText?) {
    let queryObj = {};
    if (searchText) {
      queryObj['searchKey'] = searchText;
    }
    this.isClubCallInProgress = true;
    this.subscriptions.push(
      this._class.getClub(queryObj).subscribe(res => {
        this.isClubCallInProgress = false;
        this.clubList = res.data;
      }, () => {
        this.isClubCallInProgress = false;
      })
    );
  }

  getCategoryList() {
    let queryObj = {
      pageNo: 1,
      limit: 100,
      categoryType: this.API_EVENT.class,
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

  getButtunGroupStatus(status: string) {
    this.resetPages();
    if (status == this.API_EVENT.all) {
      this._router.navigate([CLASSES]);
    } else {
      this._router.navigate([CLASSES], { queryParams: { classStatus: status } });
    }
  }

  classStartDateChange() {
    this.f.endTime.setValue(null);
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
    this.getClassListing();
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
