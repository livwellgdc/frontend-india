import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableService } from '../../../../../../../components/mat-table-renderer/table.service';
import { Pagination } from '../../../../../../../constants/paginator';
import { RewardsService } from '../../../../_service/rewards.service';
import { titleCase } from '../../../../../../../constants/helper';
import { CommonService } from '../../../../../../../services/common/common.service';
import { REWARD_REDEEM_REPORT_API } from '../../../../../../../constants/api-end-point';
import { MatTableRendererComponent } from '../../../../../../../components/mat-table-renderer/mat-table-renderer.component';
import { SECTION_ID_OF } from 'src/app/constants/messages';

@Component({
  selector: 'lv-reward-redeemed-users',
  templateUrl: './reward-redeemed-users.component.html',
  styleUrls: ['./reward-redeemed-users.component.scss']
})
export class RewardRedeemedUsersComponent extends Pagination implements OnInit {
  @Input() rewardId: string;
  heading = [
    { heading: "Redeemed User", key: "fullName" },
    { heading: "Reward Name", key: "name" },
    { heading: "Sponsor Name", key: "sponsorName" },
    { heading: "Reward Points", key: "points", align: "center" },
    { heading: "Discount Code", key: "discountCode", align: "center" },
    { heading: "Date", key: "created", align: "center", type: 'date' },
    { heading: "Time", key: "created", align: "center", type: 'time' },
    { heading: "Location", key: "location", type: 'showTitle' }
  ];
  @ViewChild(MatTableRendererComponent, null) tableRef: MatTableRendererComponent;
  public SECTION_ID_OF = SECTION_ID_OF;

  constructor(
    private _reward: RewardsService,
    private _table: TableService,
    private _common: CommonService
  ) { super(); }

  ngOnInit() {
    this.getRewardRedeemedUserList();
  }

  getRewardRedeemedUserList() {
    let queryObj = {
      rewardId: this.rewardId,
      ...this.pageParams
    }
    if (this.search) {
      queryObj['searchKey'] = this.search;
    }
    this._reward.getRewardRedeemedUsers(queryObj).subscribe(response => {
      response.data.forEach(element => {
        element['fullName'] = element.userId && element.userId.fullName ? titleCase(element.userId.fullName) : '';
        element['name'] = element.rewardId && element.rewardId.name && element.rewardId.name.en ? titleCase(element.rewardId.name.en) : '';
        element['sponsorName'] = element.rewardId && element.rewardId.sponsorName ? titleCase(element.rewardId.sponsorName) : '';
        element['points'] = element.rewardId && element.rewardId.points ? element.rewardId.points : 0;
        element['discountCode'] = element.discountCode ? element.discountCode : '';
      });
      this._table.tableRender(response);
    }, () => {
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
    this.getRewardRedeemedUserList();
  }

  sortByListing(event: any) {
    this.sortOptions = event;
    this.getRewardRedeemedUserList();
  }

  downloadList(event) {
    let obj = [
      { key: 'rewardId', value: this.rewardId }
    ];
    if (this.search) {
      obj.push({ key: 'searchKey', value: this.search });
    }
    this._common.exportReports(REWARD_REDEEM_REPORT_API, obj);
  }

}
