import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';
import { ReelsComponent } from './reels.component';

const innerRoutes: Routes = [
  { 
    path:"", component: ReelsComponent, children : [
      { path: "", loadChildren: () => import("./pages/reels-list/reels-list.module").then(m => m.ReelsListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-reels/add-edit-reels.module").then(m => m.AddEditReelsModule)},
      { path: `${EDIT}/:reelsId`, loadChildren: () => import("./pages/add-edit-reels/add-edit-reels.module").then(m => m.AddEditReelsModule)},
      { path: ":reelsId", loadChildren: () => import("./pages/reels-details/reels-details.module").then(m => m.ReelsDetailsModule)}
    ]
  }
]

@NgModule({
  declarations: [ ReelsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class ReelsModule { }
