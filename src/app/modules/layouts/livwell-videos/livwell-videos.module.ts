import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivwellVideosComponent } from './livwell-videos.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: LivwellVideosComponent, children: [
      { path: '', loadChildren: () => import('./pages/livwell-videos-listing/livwell-videos-listing.module').then(m => m.LivwellVideosListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-livwell-videos/add-edit-livwell-videos.module').then(m => m.AddEditLivwellVideosModule) },
      { path: `${EDIT}/:videoId`, loadChildren: () => import('./pages/add-edit-livwell-videos/add-edit-livwell-videos.module').then(m => m.AddEditLivwellVideosModule) },
      { path: ':videoId', loadChildren: () => import('./pages/livwell-videos-details/livwell-videos-details.module').then(m => m.LivwellVideosDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [LivwellVideosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class LivwellVideosModule { }
