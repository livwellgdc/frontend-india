import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListingComponent } from './post-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';

const inrRoutes: Routes = [
  {
    path: '', component: PostListingComponent
  }
];

@NgModule({
  declarations: [PostListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule
  ]
})
export class PostListingModule { }
