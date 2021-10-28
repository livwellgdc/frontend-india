import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lv-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterComponent implements OnInit {
  @Output() apply: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  applyForm(info: boolean) {
    const send = {
      apply: info
    }
    this.apply.emit(send);
  }

}
