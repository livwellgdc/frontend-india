import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lv-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.scss']
})
export class TermConditionComponent implements OnInit {
  currentTab: any;
  constructor(public _router: Router) { }

  ngOnInit() {
    this.currentTab = this._router.url.split('/')[2]
  }

}
