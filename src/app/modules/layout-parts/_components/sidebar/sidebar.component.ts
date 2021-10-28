import { Component, OnInit } from '@angular/core';
import { IconService } from '../../../../services/icon/icon.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { CLUBS, CLIENT_CLUBS, POINTS_DISTRIBUTION, POINTS_DISTRIBUTION_HISTORY, REWARDS, PROMO_MGMT, SPECIAL_OFFERS, PER_STEP_LWC, BOARDS, POSTS } from '../../../../constants/routes';
import { SECTION_ID_OF } from 'src/app/constants/messages';

@Component({
  selector: 'lv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [IconService]
})
export class SidebarComponent implements OnInit {

  public SECTION_ID_OF = SECTION_ID_OF;
  constructor(private _iconService: IconService,
    private _router: Router,
    public storage: StorageService) { }

  ngOnInit() {
    this._iconService.registerIcons();
  }

  isExpandedOfferSidebar() {
    let url = this.getUrl();
    if (url == PROMO_MGMT || url == SPECIAL_OFFERS) {
      return true;
    } else {
      return false;
    }
  }

  isExpandedClubSidebar() {
    let url = this.getUrl();
    if (url == CLIENT_CLUBS || url == CLUBS) {
      return true;
    } else {
      return false;
    }
  }

  isExpandedLwcSidebar() {
    let url = this.getUrl().split('?')[0];
    if (url == POINTS_DISTRIBUTION || url == PER_STEP_LWC || url == POINTS_DISTRIBUTION_HISTORY) {
      return true;
    } else {
      return false;
    }
  }

  isExpandedMssgBoardSidebar() {
    let url = this.getUrl().split('?')[0];
    if (url == BOARDS || url == POSTS) {
      return true;
    } else {
      return false;
    }
  }

  getUrl() {
    return this._router.url.split('/')[1];
  }


}
