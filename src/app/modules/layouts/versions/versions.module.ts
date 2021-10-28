import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionsComponent } from './versions.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: VersionsComponent, children: [
      { path: '', loadChildren: () => import('./pages/versions-listing/versions-listing.module').then(m => m.VersionsListingModule) },
      { path: ':versionId', loadChildren: () => import('./pages/versions-details/versions-details.module').then(m => m.VersionsDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [VersionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class VersionsModule { }
