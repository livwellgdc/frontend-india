import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'lv-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  data: any = [];
  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.data.subscribe(data => {
      this.data = data;
    });
  }

}
