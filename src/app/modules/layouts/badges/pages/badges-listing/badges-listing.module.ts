import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesListingComponent } from './badges-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoutes: Routes = [
  {
    path: '', component: BadgesListingComponent
  }
];

@NgModule({
  declarations: [BadgesListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    ReactiveFormsModule,
    MatTableRendererModule
  ]
})
export class BadgesListingModule { }
