import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeeplinksComponent } from './deeplinks.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';

const innerRoutes: Routes = [
  { 
    path:"", component: DeeplinksComponent, children : [
      { path: "", loadChildren: () => import("./pages/deeplinks-list/deeplinks-list.module").then(m => m.DeeplinksListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-deeplinks/add-edit-deeplinks.module").then(m => m.AddEditDeeplinksModule)},
      { path: `${EDIT}/:deepLinkId`, loadChildren: () => import("./pages/add-edit-deeplinks/add-edit-deeplinks.module").then(m => m.AddEditDeeplinksModule)},
      { path: ":deepLinkId", loadChildren: () => import("./pages/deeplinks-details/deeplinks-details.module").then(m => m.DeeplinksDetailsModule)}
    ]
  }
]

@NgModule({
  declarations: [DeeplinksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class DeeplinksModule { }
