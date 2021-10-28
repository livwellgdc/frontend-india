import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: GroupsComponent, children: [
      { path: '', loadChildren: () => import('./pages/group-listing/group-listing.module').then(m => m.GroupListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-groups/add-edit-groups.module').then(m => m.AddEditGroupsModule) },
      { path: `${EDIT}/:squadId`, loadChildren: () => import('./pages/add-edit-groups/add-edit-groups.module').then(m => m.AddEditGroupsModule) },
      { path: ':squadId', loadChildren: () => import('./pages/group-details/group-details.module').then(m => m.GroupDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class GroupsModule { }
