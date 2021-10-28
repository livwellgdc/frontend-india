import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACCOUNT, TERM_CONDITIONS, PRIVACY_POLICY, ABOUT_US, CONTACT_US, FAQ_LIST } from './constants/routes';
import { LogInGuard } from './services/guards/log-in/log-in.guard';
import { AuthGuard } from './services/guards/auth-guard/auth-guard.guard';


const routes: Routes = [
  { path: '', redirectTo: ACCOUNT, pathMatch: 'full' },
  { path: ACCOUNT, loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule), canActivate: [LogInGuard] },
  { path: '', loadChildren: () => import('./modules/layouts/layouts.module').then(m => m.LayoutsModule), canActivate: [AuthGuard] },
  { path: `${TERM_CONDITIONS}/:language`, loadChildren: () => import('./modules/un-auth-cms/un-auth-cms.module').then(m => m.UnAuthCmsModule) },
  { path: `${PRIVACY_POLICY}/:language`, loadChildren: () => import('./modules/un-auth-cms/un-auth-cms.module').then(m => m.UnAuthCmsModule) },
  { path: `${ABOUT_US}/:language`, loadChildren: () => import('./modules/un-auth-cms/un-auth-cms.module').then(m => m.UnAuthCmsModule) },
  { path: `${CONTACT_US}/:language`, loadChildren: () => import('./modules/un-auth-cms/un-auth-cms.module').then(m => m.UnAuthCmsModule) },
  { path: `${FAQ_LIST}/:language`, loadChildren: () => import('./modules/un-auth-cms/un-auth-cms.module').then(m => m.UnAuthCmsModule) },
  { path: '**', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
