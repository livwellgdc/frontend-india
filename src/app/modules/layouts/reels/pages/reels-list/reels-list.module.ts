import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReelsListComponent } from './reels-list.component';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { ReactiveFormsModule } from '@angular/forms';

const innerRoutes: Routes = [
  { path: '', component: ReelsListComponent }
]

@NgModule({
  declarations: [ ReelsListComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class ReelsListModule { }
