import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lv-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  currentTab: any;
  constructor(public _router: Router) { }

  ngOnInit() {
    this.currentTab = this._router.url.split('/')[2]
  }
}
