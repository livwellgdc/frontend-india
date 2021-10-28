import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FitnessReelsListComponent } from './fitness-reels-list.component';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoplayModalModule } from 'src/app/components/videoplay-modal/videoplay-modal.module';

const innerRoutes: Routes = [
  { path: '', component: FitnessReelsListComponent }
]

@NgModule({
  declarations: [FitnessReelsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule,
    VideoplayModalModule
  ]
})
export class FitnessReelsListModule { }
