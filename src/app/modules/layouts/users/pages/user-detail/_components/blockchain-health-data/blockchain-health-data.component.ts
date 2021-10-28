import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../components/breadcrumb/breadcrumb.service';
import { BC_USERS_DETAILS } from '../../../../../../../constants/breadcrumb-routes';
import { UserService } from '../../../../_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lv-blockchain-health-data',
  templateUrl: './blockchain-health-data.component.html',
  styleUrls: ['./blockchain-health-data.component.scss']
})
export class BlockchainHealthDataComponent implements OnInit {
  isApiCallInProgress = false;
  healthData: any;

  constructor(
    private _bc: BreadcrumbService,
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_USERS_DETAILS('Blockchain Health Data'));
    this.getBlockchainHealthData();
  }

  getBlockchainHealthData() {
    let queryObj = {
      userId: this._router.url.split('/')[2],
    }
    this.isApiCallInProgress = true;
    this._user.getBlockchainHealthData(queryObj).subscribe(response => {
      this.isApiCallInProgress = false;
      this.healthData = response.data;
    }, (error) => {
      this.isApiCallInProgress = false;
    });
  }

}
