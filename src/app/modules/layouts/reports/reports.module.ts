import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { NumberModule } from 'src/app/directives/number/number.module';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { TabsModule } from 'src/app/components/tabs/tabs.module';
import { SalesTrackerReportComponent } from './sales-tracker-report/sales-tracker-report.component';
import { ReportFilterComponent } from './_components/report-filter/report-filter.component';
import { ReportsComponent } from './reports.component';
import { ReferrerTrackerReportComponent } from './_components/referrer-tracker-report/referrer-tracker-report.component';

const innerRoutes: Routes = [
  {
    path: 'sales', component: SalesTrackerReportComponent
  },
  {
    path: 'referrer', component: ReferrerTrackerReportComponent
  }
]

@NgModule({
  declarations: [
    SalesTrackerReportComponent,
    ReportFilterComponent,
    ReportsComponent,
    ReferrerTrackerReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NumberModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableRendererModule,
    TabsModule
  ]
})
export class ReportsModule { }
