import { Component, OnInit, ViewChild } from '@angular/core';
import { CorporateService } from '../../_service/corporate.service';
import { CORPORATES, ADD, EDIT } from '../../../../../constants/routes';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { Pagination } from '../../../../../constants/paginator';
import { TableService } from '../../../../../components/mat-table-renderer/table.service';
import { CommonService } from '../../../../../services/common/common.service';
import { ToastService } from '../../../../../components/toast-notification/toast.service';
import { BC_CORPORATES } from '../../../../../constants/breadcrumb-routes';
import { MatTableRendererComponent } from '../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { titleCase } from '../../../../../constants/helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STATUS, COMPANY_TYPE } from '../../../../../constants/messages';

@Component({
  selector: 'lv-corporate-list',
  templateUrl: './corporate-list.component.html',
  styleUrls: ['./corporate-list.component.scss'],
  providers: [CorporateService]
})
export class CorporateListComponent extends Pagination implements OnInit {
  heading = [
    { heading: 'Corporate Name', key: 'name', content: true, sort: true, type: "link", link: `/${CORPORATES}` },
    { heading: 'Coins Purchased', key: 'points', align: 'center', sort: true },
    { heading: 'Remaining Coins', key: 'pointsRemaining', align: 'center', sort: true },
    { heading: 'Coins Distribution Freq.', key: 'frequencyType', align: 'center', type: "formatStatus" },
    { heading: 'Coins Distribution Status', key: 'distributionStatus', align: 'center', type: "formatStatus" },
    { heading: 'Corporate Status', key: 'status', align: 'center', type: "formatStatus" },
    { heading: 'Action', key: 'status', type: 'action', action: [1, 2] }
  ];
  subscriptions: Subscription[] = [];
  filterForm: FormGroup;
  staticArrays = {
    corporateStatus: [],
    companyTypes: []
  }
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;

  constructor(
    private _bc: BreadcrumbService,
    private _fb: FormBuilder,
    private _router: Router,
    private _table: TableService,
    private _corporate: CorporateService,
    public _common: CommonService,
    private _toast: ToastService
  ) { super() }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_CORPORATES);
    this.staticArrays.corporateStatus = STATUS;
    this.staticArrays.companyTypes = COMPANY_TYPE;
    this.createForm();
    this.getCorporateListing();
  }

  createForm() {
    this.filterForm = this._fb.group({
      status: [''],
      companyType: ['']
    });
  }

  get f() { return this.filterForm.controls }  //return all form controls

  getCorporateListing() {
    this.subscriptions.push(
      this._corporate.getCorporateList(this.validPageOptions).subscribe(response => {
        response.data.forEach(element => {
          element['name'] = titleCase(element.name);
          if (element['isExpired']) {
            element['distributionStatus'] = 'EXPIRED';
          } else {
            element['distributionStatus'] = 'ACTIVE';
          }
        });
        this._table.tableRender(response);
      }, () => {
        this._table.tableRender({ data: [] });
      })
    );
  }

  addCorporate(status: any) {
    /**
     * [ADD,EDIT]=[0,1]
     */
    if (status.id == 0) {
      this._router.navigate([`${CORPORATES}/${ADD}`]);
    }
    else {
      this._router.navigate([`${CORPORATES}/${EDIT}`, status.data._id]);
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
    this.getCorporateListing();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getCorporateListing();
  }

  changeStatus(status: any) {
    switch (status.id) {
      case 1:
        this.addCorporate(status);
        break;
      default:
        this.changeCorporateStatus(status);
        break;
    }
  }

  changeCorporateStatus(corporateInfo: any) {
    const updateObj = {
      corporateId: corporateInfo.data._id,
      status: corporateInfo.action
    };
    this._corporate.blockUnblockCorporate(updateObj).subscribe(response => {
      this.getCorporateListing();
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
    this.getCorporateListing();
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
