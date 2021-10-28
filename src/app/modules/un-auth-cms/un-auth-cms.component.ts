import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UnAuthCmsService } from './_service/un-auth-cms.service';
import { CMS_TYPE } from '../../constants/messages';
import { TERM_CONDITIONS, PRIVACY_POLICY, ABOUT_US, CONTACT_US, FAQ_LIST } from '../../constants/routes';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'lv-un-auth-cms',
  templateUrl: './un-auth-cms.component.html',
  styleUrls: ['./un-auth-cms.component.scss'],
  providers: [UnAuthCmsService]
})
export class UnAuthCmsComponent implements OnInit, OnDestroy {
  contentInfo = '';
  faqList = [];
  pageInfoObj = {
    pageContentNotFound: '',
    isFaqReqPage: false,
    isApiCallInProgress: false
  }
  subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _unAuthCms: UnAuthCmsService,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this.checkPageTypeReq();
  }

  checkPageTypeReq() {
    switch (this._router.url.split('/')[1]) {
      case TERM_CONDITIONS:
        this.pageInfoObj.pageContentNotFound = "Terms & Conditions not added";
        this.getUnAuthCmsContent(CMS_TYPE.TERM_CONDITION);
        break;

      case PRIVACY_POLICY:
        this.pageInfoObj.pageContentNotFound = "Privacy Policy not added";
        this.getUnAuthCmsContent(CMS_TYPE.PRIVACY_POLICY);
        break;

      case ABOUT_US:
        this.pageInfoObj.pageContentNotFound = "About Us not added";
        this.getUnAuthCmsContent(CMS_TYPE.ABOUT_US);
        break;

      case CONTACT_US:
        this.pageInfoObj.pageContentNotFound = "Contact Us not added";
        this.getUnAuthCmsContent(CMS_TYPE.CONTACT_US);
        break;

      case FAQ_LIST:
        this.pageInfoObj.pageContentNotFound = "FAQ's not added";
        this.pageInfoObj.isFaqReqPage = true;
        this.getUnAuthCmsContent(CMS_TYPE.FAQ);
        break;

      default:
        break;
    }
  }

  getUnAuthCmsContent(cmsType: string) {
    this.pageInfoObj.isApiCallInProgress = true;
    let queryParams = {
      type: cmsType,
      language: this._router.url.split('/')[2] == 'vi' ? 'vi' : 'en'
    }
    this.subscriptions.push(
      this._unAuthCms.getCmsContent(queryParams).subscribe(res => {
        this.pageInfoObj.isApiCallInProgress = false;
        if (this.pageInfoObj.isFaqReqPage) {
          this.faqList = res.data;
        } else {
          this.contentInfo = res.data.data;
        }
      }, (error) => {
        this.pageInfoObj.isApiCallInProgress = false;
      })
    );
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
