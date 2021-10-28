import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';

const innerRoutes: Routes = [
  { 
    path:"", component: QuicklinksComponent, children : [
      { path: "", loadChildren: () => import("./pages/quicklinks-list/quicklinks-list.module").then(m => m.QuicklinksListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-quicklinks/add-edit-quicklinks.module").then(m => m.AddEditQuicklinksModule)},
      { path: `${EDIT}/:quickLinkId`, loadChildren: () => import("./pages/add-edit-quicklinks/add-edit-quicklinks.module").then(m => m.AddEditQuicklinksModule)},
      { path: ":quickLinkId", loadChildren: () => import("./pages/quicklinks-details/quicklinks-details.module").then(m => m.QuicklinksDetailsModule)}
    ]
  }
]

@NgModule({
  declarations: [QuicklinksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class QuicklinksModule { }
