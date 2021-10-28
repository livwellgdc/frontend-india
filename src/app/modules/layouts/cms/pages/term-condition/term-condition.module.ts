import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermConditionComponent } from './term-condition.component';
import { Routes, RouterModule } from '@angular/router';
import { EditorModule } from '../../_components/editor/editor.module';

const inrRoutes: Routes = [
  { path: '', component: TermConditionComponent }
];

@NgModule({
  declarations: [TermConditionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    EditorModule
  ]
})
export class TermConditionModule { }
