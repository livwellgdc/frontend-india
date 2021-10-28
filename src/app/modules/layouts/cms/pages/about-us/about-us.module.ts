import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { Routes, RouterModule } from '@angular/router';
import { EditorModule } from '../../_components/editor/editor.module';

const inrRoutes: Routes = [
  { path: '', component: AboutUsComponent }
];

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EditorModule
  ]
})
export class AboutUsModule { }
