import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoriesListComponent } from './stories-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer/mat-table-renderer.module';

const innerRoutes: Routes = [
  { path: '', component: StoriesListComponent }
]
@NgModule({
  declarations: [ StoriesListComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    MatTableRendererModule,
    ReactiveFormsModule
  ]
})
export class StoriesListModule { }
