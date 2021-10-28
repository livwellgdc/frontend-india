import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_STATUS } from 'src/app/constants/messages';

@Component({
  selector: 'lv-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {

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
