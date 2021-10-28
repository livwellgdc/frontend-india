import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';

const inrRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: '', loadChildren: () => import('./pages/user-listing/user-listing.module').then(m => m.UserListingModule) },
      { path: ':userId', loadChildren: () => import('./pages/user-detail/user-detail.module').then(m => m.UserDetailModule) }
    ]
  },

];



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class UsersModule { }
