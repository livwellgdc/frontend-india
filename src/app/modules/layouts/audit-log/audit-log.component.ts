import { Component, OnInit } from '@angular/core';
import { slideInDownAnimation } from 'src/app/components/mat-table-renderer/filter-animation';

@Component({
  selector: 'lv-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
  animations: [slideInDownAnimation]

})
export class AuditLogComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {}
   
}

