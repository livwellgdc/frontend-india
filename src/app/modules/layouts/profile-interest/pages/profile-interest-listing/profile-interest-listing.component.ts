import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { ProfileInterestService } from '../../_service/profile-interest.service';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../../../../services/common/common.service';
import { Pagination } from '../../../../../constants/paginator';
import { AddEditProfileInterestComponent } from '../../_components/add-edit-profile-interest/add-edit-profile-interest.component';
import { PROFILE_INTERESTS } from './../../../../../constants/routes';
import { BC_PROFILE_INTERESTS } from '../../../../../constants/breadcrumb-routes';
import { INTEREST_CATGORY_TYPE, SECTION_ID_OF } from '../../../../../constants/messages';
import { titleCase, isObjEmpty } from '../../../../../constants/helper';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';

@Component({
  selector: 'lv-profile-interest-listing',
  templateUrl: './profile-interest-listing.component.html',
  styleUrls: ['./profile-interest-listing.component.scss']
})
export class ProfileInterestListingComponent extends Pagination implements OnInit, OnDestroy {
  heading = [
    { heading: 'Interest Name', key: 'profileinterestName', sort: true, type: "link", link: `/${PROFILE_INTERESTS}` },
    { heading: 'Category', key: 'categoryName', type: 'formatStatus' },
    { heading: "Created Date", key: "created", align: "center", type: 'date', sort: true },
    { heading: 'Action', key: 'status', type: 'action', action: [1] }
  ];
  filterForm: FormGroup;
  interestCategories = INTEREST_CATGORY_TYPE;
  subscriptions: Subscription[] = [];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _table: TableService,
    private _interst: ProfileInterestService,
    private _dialog: MatDialog,
    private _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_PROFILE_INTERESTS);
    this.permissionHandler();
    this.createForm();
    this.getInterestListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      categoryName: ['']
    });
  }

  get f() { return this.filterForm.controls } //return form controls

  /**
   * @ROLE_MANAGEMENT
  */
  permissionHandler() {
    let permission = this._common.getPermissionBySectionId(SECTION_ID_OF.INTERESTS);
    if (!isObjEmpty(permission)) {
      if (!permission.addEdit) {
        this.permissionClass = 'removeAddButton';
        this.heading.splice(this.heading.length - 1, 1);
      }
    }
  }

  getInterestListing() {
    this.subscriptions.push(
      this._interst.getInterests(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['profileinterestName'] = titleCase(element.name.en);
        })
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addInterest(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    const dialog = this._dialog.open(AddEditProfileInterestComponent, {
      autoFocus: false,
      disableClose: true,
      data: status
    })
    dialog.afterClosed().subscribe(result => {
      if (result && result.isHitApi) {
        this.getInterestListing();
      }
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
    this.getInterestListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getInterestListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addInterest(status); // Edit Interest
        break;
      default:
        break;
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
    this.getInterestListing();
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
