import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoMgmtComponent } from './promo-mgmt.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { LoadOnScrollModule } from '../../../../../components/load-on-scroll/load-on-scroll.module';

const inrRoutes: Routes = [
  {
    path: '', component: PromoMgmtComponent
  }
];

@NgModule({
  declarations: [PromoMgmtComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    LoadOnScrollModule,
    MatSnackBarModule
  ]
})
export class PromoMgmtModule { }
