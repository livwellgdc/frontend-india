import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientClubsListingComponent } from './client-clubs-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: ClientClubsListingComponent
  }
];

@NgModule({
  declarations: [ClientClubsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
  ]
})
export class ClientClubsListingModule { }
