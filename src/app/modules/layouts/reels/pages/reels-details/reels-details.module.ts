import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowDescriptionModule } from 'src/app/components/show-description/show-description.module';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { EmptyValueModule } from 'src/app/pipes/empty-value/empty-value.module';
import { ReelsDetailsComponent } from './reels-details.component';

const innerRoutes: Routes = [
  { path: "", component: ReelsDetailsComponent }
]

@NgModule({
  declarations: [ ReelsDetailsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    ShowDescriptionModule,
    MatTableRendererModule,
    EmptyValueModule
  ]
})
export class ReelsDetailsModule { }
