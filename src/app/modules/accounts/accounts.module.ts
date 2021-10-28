import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountService } from './_service/account.service';
import { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from '../../constants/routes';

const inrRoute: Routes = [
  {
    path: '', component: AccountsComponent, children: [
      { path: '', redirectTo: LOGIN },
      { path: LOGIN, loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
      { path: FORGOT_PASSWORD, loadChildren: () => import('./pages/forgot/forgot.module').then(m => m.ForgotModule) },
      { path: `${RESET_PASSWORD}/:token`, loadChildren: () => import('./pages/reset/reset.module').then(m => m.ResetModule) },
    ]
  }
];

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
  ],
  providers: [AccountService]
})

export class AccountsModule { }
