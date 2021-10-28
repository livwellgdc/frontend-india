import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lv-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  currentTab: any;
  constructor(public _router: Router) { }

  ngOnInit() {
    this.currentTab = this._router.url.split('/')[2]
  }
}
