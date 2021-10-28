import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lv-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  currentTab: any;
  constructor(public _router: Router) { }

  ngOnInit() {
    this.currentTab = this._router.url.split('/')[2]
  }
}
