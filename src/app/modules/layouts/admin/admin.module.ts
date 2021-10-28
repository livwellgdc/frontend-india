import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { EDIT, CHANGE_PASSWORD } from 'src/app/constants/routes';
import { AdminService } from './_service/admin.service';

const inrRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', loadChildren: () => import('./pages/profile-detail/profile-detail.module').then(m => m.ProfileDetailModule) },
      { path: EDIT, loadChildren: () => import('./pages/profile-edit/profile-edit.module').then(m => m.ProfileEditModule) },
      { path: CHANGE_PASSWORD, loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule) },
    ]
  }
];


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ],
  providers: [AdminService]
})
export class AdminModule { }
