import { LoaderService } from './loader.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-loader',
  template: `<div class="loader-overlay" [hidden]="!show"><div class="progress">
             <div class="indeterminate"></div></div></div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = true;
  private subLoader: Subscription;

  constructor(public loader: LoaderService) { }

  ngOnInit() {
    this.subLoader = this.loader.loaderState.subscribe((showState: boolean) => {
      setTimeout(() => {
        this.show = showState;
      }, 5);
    });
  }

  ngOnDestroy() {
    if (this.subLoader) {
      this.subLoader.unsubscribe();
    }
  }

}
