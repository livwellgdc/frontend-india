import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogListComponent } from './audit-log-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { LazyImageModule } from 'src/app/components/lazy-image/lazy-image.module';
import { CropperModule } from 'src/app/components/cropper/cropper.module';
import { AuditLogService } from '../services/audit-log.service';
import { AUDIT_LOG_BADGE_HISTORY, AUDIT_LOG_CHALANGES_HISTORY, AUDIT_LOG_HEALTH_HISTORY, AUDIT_LOG_LOGIN_HISTORY, AUDIT_LOG_POINT_HISTORY, AUDIT_LOG_REWARD_HISTORY } from 'src/app/constants/routes';
import { AuditLogHealthComponent } from '../audit-log-health/audit-log-health.component';
import { AuditLogRewardComponent } from '../audit-log-reward/audit-log-reward.component';
import { AuditLogPointHistoryComponent } from '../audit-log-redeem/audit-log-redeem.component';
import { AuditLogChalangesComponent } from '../audit-log-chalanges/audit-log-chalanges.component';
import { ButtonGroupModule } from 'src/app/components/button-group/button-group.module';
import { BadgeHistoryComponent } from '../badge-history/badge-history.component';

const inrRoutes: Routes = [
 
  {
    path: AUDIT_LOG_LOGIN_HISTORY, component: AuditLogListComponent,
  },
  {
    path: AUDIT_LOG_HEALTH_HISTORY, component: AuditLogHealthComponent,
  },
  {
    path: AUDIT_LOG_REWARD_HISTORY, component: AuditLogRewardComponent
  },
  {
    path: AUDIT_LOG_POINT_HISTORY, component: AuditLogPointHistoryComponent
  },
  {
    path: AUDIT_LOG_CHALANGES_HISTORY, component: AuditLogChalangesComponent
  },
  {
    path: AUDIT_LOG_BADGE_HISTORY, component: BadgeHistoryComponent
  }
];


@NgModule({
  declarations: [ AuditLogListComponent, AuditLogHealthComponent, BadgeHistoryComponent,
    AuditLogRewardComponent, AuditLogPointHistoryComponent, AuditLogChalangesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule,
    MatDialogModule,
    LazyImageModule,
    CropperModule,
    ButtonGroupModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [AuditLogService],
})
export class AuditLogListModule { }
