import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsDetailsComponent } from './clubs-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { QRCodeModule } from "angularx-qrcode";

const inrRoutes: Routes = [
  {
    path: '', component: ClubsDetailsComponent
  }
];

@NgModule({
  declarations: [ClubsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    MatIconModule,
    FormatStatusModule,
    QRCodeModule
  ]
})
export class ClubsDetailsModule { }
