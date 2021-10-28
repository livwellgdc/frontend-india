import { Component, OnInit, Input } from "@angular/core";
import { TERM_CONDITIONS, PRIVACY_POLICY, ABOUT_US, CONTACT_US, USERS, BADGE_EARNED, BLOCKCHAIN_CHALLENGE_DATA, BLOCKCHAIN_HEALTH_DATA, ASSIGNED_CODES, SELES_TRACKER } from '../../constants/routes';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: "lv-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {
  @Input() tabName;
  @Input() userId;
  navLinks: any;

  constructor(private _storage: StorageService) { }

  ngOnInit() {
    this.showTabs();
  }

  showTabs() {
    switch (this.tabName) {
      case 'cmsTabs':
        this.navLinks = CMS_TAB_LINKS;
        break;

      case 'userDetailTabs':
        if (this._storage.adminDetail.userType == 'ADMIN') {
          this.navLinks = USER_DETAILS_TAB_LINKS(this.userId);
        } else {
          this.navLinks = USER_DETAILS_TAB_LINKS(this.userId).filter((el) => { return el.label != "Blockchain Challenge Data" && el.label != "Blockchain Health Data" });
        }
        break;

        case 'selesTrackerTabs':
          this.navLinks = SELES_TRACKER_TAB_LINKS;
          break;

      default:
        break;
    }
  }
}

export const CMS_TAB_LINKS = [
  { path: TERM_CONDITIONS, label: "Terms & Conditions" },
  { path: PRIVACY_POLICY, label: "Privacy Policy" },
  { path: ABOUT_US, label: "About Us" },
  { path: CONTACT_US, label: "Contact Us" }
]

export const USER_DETAILS_TAB_LINKS = (userId) => [
  { path: `/${USERS}/${userId}/${BADGE_EARNED}`, label: "Badge Earned" },
  { path: `/${USERS}/${userId}/${BLOCKCHAIN_CHALLENGE_DATA}`, label: "Blockchain Challenge Data" },
  { path: `/${USERS}/${userId}/${BLOCKCHAIN_HEALTH_DATA}`, label: "Blockchain Health Data" }
]


export const SELES_TRACKER_TAB_LINKS = [
  { path: `/${ SELES_TRACKER }`, label: "Assigned Codes" },
]
