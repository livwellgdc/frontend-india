import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { Routes, RouterModule } from '@angular/router';
import { EditorModule } from '../../_components/editor/editor.module';

const inrRoutes: Routes = [
  { path: '', component: ContactUsComponent }
];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EditorModule
  ]
})
export class ContactUsModule { }
