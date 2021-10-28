import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable()

export class LoaderService {

  private loaderSubject = new Subject<boolean>();
  public loaderState = this.loaderSubject.asObservable();

  constructor(
    private router: Router,
  ) {
    this.routeNavigationStart();
  }

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }

  routeNavigationStart() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.hide();
      }
    });

  }
}
