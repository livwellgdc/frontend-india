import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_STATUS } from '../../../../../constants/messages';

@Component({
  selector: 'lv-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  @Input() filter: FormGroup;
  today: Date = new Date();
  status = USER_STATUS;
  constructor(
  ) { }

  ngOnInit() {
  }

  get f() { return this.filter.controls; }

  selectFromDate(event: any) {
    this.f.toDate.setValue(null);
  }
}
