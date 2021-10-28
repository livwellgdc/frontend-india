import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitnessReelsComponent } from './fitness-reels.component';
import { RouterModule, Routes } from '@angular/router';

const innerRoutes: Routes = [
  { 
    path:"", component: FitnessReelsComponent, children : [
      { path: "", loadChildren: () => import("./pages/fitness-reels-list/fitness-reels-list.module").then(m => m.FitnessReelsListModule) },
    ]
  }
]

@NgModule({
  declarations: [FitnessReelsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class FitnessReelsModule { }
