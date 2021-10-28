import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubService } from '../../_service/club.service';
import { CLUBS, ADD, EDIT } from './../../../../../constants/routes';
import { Pagination } from '../../../../../constants/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_CLUBS } from '../../../../../constants/breadcrumb-routes';
import { STATUS, SECTION_ID_OF } from '../../../../../constants/messages';
import { isObjEmpty } from '../../../../../constants/helper';
import { CLUB_REPORT_API } from '../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-clubs-listing',
  templateUrl: './clubs-listing.component.html',
  styleUrls: ['./clubs-listing.component.scss'],
  providers: [ClubService]
})
export class ClubsListingComponent extends Pagination implements OnInit {
  filterForm: FormGroup;
  heading = [
    { heading: 'Club Name', key: 'name', content: true, sort: true, type: "link", link: `/${CLUBS}` },
    { heading: 'Client', key: 'clientClub', content: true },
    { heading: 'Club Short Name', key: 'shortName', align: 'center' },
    { heading: 'QR Code', key: 'qrCode', align: 'center' },
    { heading: "Contact Number", key: "mobileNo", align: 'center' },
    { heading: 'City', key: 'cityName', align: 'center' },
    { heading: "Status", key: "status", align: "center", type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2, 3] }
  ];
  subscriptions: Subscription[] = [];
  cityList = [];
  searchedCity = [];
  tempList = [];
  status = STATUS;
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _club: ClubService,
    public _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CLUBS);
    this.permissionHandler();
    this.createForm();
    this.getClubListing();
    this.getCities();
  }

  createForm() {
    this.filterForm = this._fb.group({
      cityName: [''],
      status: ['']
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.CLUBS);
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
          this.heading[this.heading.length - 1].action = this.removeAction([2, 3]);
        }
      }
    }
  }

  removeAction(valuesToRemove) {
    return this.heading[this.heading.length - 1].action.filter(item => !valuesToRemove.includes(item));
  }

  getClubListing() {
    this.subscriptions.push(
      this._club.getClubList(this.validPageOptions).subscribe(response => {
        this.tempList = response.data;
        response.data.forEach(element => {
          element['clientClub'] = element.clientId && element.clientId.name ? element.clientId.name : '';
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  getCities() {
    this._common.getCities().then((res: []) => {
      this._common.isApiCallInProgress.ofCity = false;
      this.cityList = res;
      this.searchedCity = res;
    }, () => {
      this._common.isApiCallInProgress.ofCity = false;
    })
  }

  searchCityByName(searchKey) {
    this.searchedCity = this.cityList.filter((city) => {
      if (city.name.toLowerCase().startsWith(searchKey.toLowerCase())) {
        return city;
      }
    });
  }

  addClubs(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CLUBS}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CLUBS}/${EDIT}`, status.data._id]);
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
    this.getClubListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getClubListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addClubs(status);
        break;
      default:
        this.changeClubStatus(status);
        break;
    }
  }

  changeClubStatus(clubInfo: any) {
    const updateObj = {
      clubId: clubInfo.data._id,
      status: clubInfo.action
    };
    this._club.blockUnblockDeleteClub(updateObj).subscribe(response => {
      if (clubInfo.action == this.API_EVENT.delete && (clubInfo.data.s_no > 1 && clubInfo.data.s_no % (this.limit) == 1) && this.tempList.length == 1) {
        this.pageNo = this.pageNo - 1;
        this.tableRef.paginator.pageIndex = this.pageNo - 1;
      }
      this.getClubListing();
      this._toast.success(response.message);
    });
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
    this.getClubListing();
  }

  downloadList(event) {
    let obj = [];
    if (this.filterOptions) {
      if (this.filterOptions.status) {
        obj.push({ key: 'status', value: this.filterOptions.status });
      }
      if (this.filterOptions.cityName) {
        obj.push({ key: 'cityName', value: this.filterOptions.cityName });
      }
    }
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(CLUB_REPORT_API, obj);
  }

  /**
   * @UNSUBSCRIPTION Unsubscribe all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this._common.unsubscribe(this.subscriptions);
    }
    this._common.isApiCallInProgress.ofCity = true;
  }

}
