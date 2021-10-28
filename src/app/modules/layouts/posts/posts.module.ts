import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: PostsComponent, children: [
      { path: '', loadChildren: () => import('./pages/post-listing/post-listing.module').then(m => m.PostListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-posts/add-edit-posts.module').then(m => m.AddEditPostsModule) },
      { path: `${EDIT}/:postId`, loadChildren: () => import('./pages/add-edit-posts/add-edit-posts.module').then(m => m.AddEditPostsModule) },
      { path: ':postId', loadChildren: () => import('./pages/post-details/post-details.module').then(m => m.PostDetailsModule) }
    ]
  }
];


@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class PostsModule { }
