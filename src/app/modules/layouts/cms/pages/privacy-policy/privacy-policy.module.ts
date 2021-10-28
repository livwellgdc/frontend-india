import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { Routes, RouterModule } from '@angular/router';
import { EditorModule } from '../../_components/editor/editor.module';

const inrRoutes: Routes = [
  { path: '', component: PrivacyPolicyComponent }
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EditorModule
  ]
})
export class PrivacyPolicyModule { }
