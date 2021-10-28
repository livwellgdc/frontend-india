import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CommonService } from './services/common/common.service';
import { OFFLINE, ONLINE } from './constants/messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  consoleMessage: string = "Welcome to LivWell";
  consoleStyle: string = "color: #900968; font-size: 28px;font-weight: bold;";

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;

  constructor(
    private _common: CommonService
  ) { console.log(`%c${this.consoleMessage}`, this.consoleStyle); }

  ngOnInit() {
    this.chechStatus();
  }

  /**
   * @ONLINE_OFFLINE Get the online/offline status from browser window
   */
  chechStatus() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = ONLINE;
      this.connectionStatus = 'online';
      window.location.reload();
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = OFFLINE;
      this.connectionStatus = 'offline';
    }));
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
