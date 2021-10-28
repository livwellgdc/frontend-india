import { ADD, EDIT } from './../../../constants/routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: ChallengesComponent, children: [
      { path: '', loadChildren: () => import('./pages/challenges-listing/challenges-listing.module').then(m => m.ChallengesListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-challenges/add-edit-challenges.module').then(m => m.AddEditChallengesModule) },
      { path: `${EDIT}/:challengeId`, loadChildren: () => import('./pages/add-edit-challenges/add-edit-challenges.module').then(m => m.AddEditChallengesModule) },
      { path: ':challengeId', loadChildren: () => import('./pages/challenges-details/challenges-details.module').then(m => m.ChallengesDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ChallengesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ChallengesModule { }
