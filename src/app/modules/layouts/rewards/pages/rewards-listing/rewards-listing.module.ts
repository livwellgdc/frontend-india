import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsListingComponent } from './rewards-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  {
    path: '', component: RewardsListingComponent
  }
];

@NgModule({
  declarations: [RewardsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class RewardsListingModule { }
