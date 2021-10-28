import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  opened = true;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  ngOnInit() {
    if (window.innerWidth < 1100) {
      this.sidenav.fixedTopGap = 56;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 64;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 1100) {
      this.sidenav.fixedTopGap = 56;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 64;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 1100) {
      return true;
    } else {
      return false;
    }
  }

  closeSideNav() {
    if (window.innerWidth < 1100) {
      this.opened = false;
    }
  }

}
