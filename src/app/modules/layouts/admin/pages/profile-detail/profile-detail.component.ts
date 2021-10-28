import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../../services/storage/storage.service';
import { BreadcrumbService } from '../../../../../components/breadcrumb/breadcrumb.service';
import { BC_ADMIN_PROFILE } from '../../../../../constants/breadcrumb-routes';
import { DATE_TYPES } from './../../../../../constants/messages';

@Component({
  selector: 'lv-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  adminInfo: any;
  dateTypes = DATE_TYPES;
  constructor(private _bc: BreadcrumbService, private _storage: StorageService) {
  }

  ngOnInit() {
    this._bc.setBreadcrumb(BC_ADMIN_PROFILE);
    this.getAdminInfo();
  }

  getAdminInfo() {
    this._storage.getAdminDetail().then(response => {
      this.adminInfo = response;
    })
  }

}
