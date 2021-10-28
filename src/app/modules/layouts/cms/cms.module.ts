import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';
import { Routes, RouterModule } from '@angular/router';
import { TabsModule } from '../../../components/tabs/tabs.module';
import { TERM_CONDITIONS, PRIVACY_POLICY, ABOUT_US, CONTACT_US } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: CmsComponent,
    children: [
      { path: '', redirectTo: TERM_CONDITIONS, pathMatch: 'full' },
      {
        path: TERM_CONDITIONS, loadChildren: () => import('./pages/term-condition/term-condition.module').then(m => m.TermConditionModule)
      },
      {
        path: PRIVACY_POLICY, loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: ABOUT_US, loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: CONTACT_US, loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [CmsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    TabsModule
  ]
})
export class CmsModule { }
