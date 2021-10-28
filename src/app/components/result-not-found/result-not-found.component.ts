import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lv-result-not-found',
  templateUrl: './result-not-found.component.html',
  styleUrls: ['./result-not-found.component.scss']
})
export class ResultNotFoundComponent implements OnInit {
  @Input() msg: string;
  constructor() { }

  ngOnInit() {
  }

}
