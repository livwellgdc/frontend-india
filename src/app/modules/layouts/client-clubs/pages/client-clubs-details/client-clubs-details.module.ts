import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientClubsDetailsComponent } from './client-clubs-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DataLoaderModule } from '../../../../../components/data-loader/data-loader.module';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { FormatStatusModule } from '../../../../../pipes/format-status/format-status.module';
import { PointsDistributionHistoryComponent } from './_components/points-distribution-history/points-distribution-history.component';
import { MatTableRendererModule } from './../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ClientClubService } from '../../_service/client-club.service';

const inrRoutes: Routes = [
  {
    path: '', component: ClientClubsDetailsComponent
  }
];

@NgModule({
  declarations: [ClientClubsDetailsComponent, PointsDistributionHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatButtonModule,
    EmptyValueModule,
    DataLoaderModule,
    MatIconModule,
    FormatStatusModule,
    MatTableRendererModule
  ],
  providers: [ClientClubService]
})
export class ClientClubsDetailsModule { }
