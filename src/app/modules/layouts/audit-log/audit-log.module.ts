import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogComponent } from './audit-log.component';

const inrRoutes: Routes = [
  {
    path: ':userId', component: AuditLogComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/audit-log-list/audit-log-list.module').then(m => m.AuditLogListModule) }
    ]
  }
];

@NgModule({
  declarations: [ AuditLogComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class AuditLogModule { }
