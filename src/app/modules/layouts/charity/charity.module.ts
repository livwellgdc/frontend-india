import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharityComponent } from './charity.component';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';


const innerRoutes: Routes = [
  { 
    path:"", component: CharityComponent, children : [
      { path: "", loadChildren: () => import("./pages/charity-list/charity-list.module").then(m => m.CharityListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-charity/add-edit-charity.module").then(m => m.AddEditCharityModule)},
      { path: `${EDIT}/:charityId`, loadChildren: () => import("./pages/add-edit-charity/add-edit-charity.module").then(m => m.AddEditCharityModule)},
      { path: ":charityId", loadChildren: () => import("./pages/charity-details/charity-details.module").then(m => m.CharityDetailsModule)}
    ]
  }

]

@NgModule({
  declarations: [CharityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class CharityModule { }
