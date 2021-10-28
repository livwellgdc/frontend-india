import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesListingComponent } from './challenges-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ReactiveFormsModule } from '@angular/forms';

const inrRoute: Routes = [
  {
    path: '', component: ChallengesListingComponent
  }
]

@NgModule({
  declarations: [ChallengesListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class ChallengesListingModule { }
