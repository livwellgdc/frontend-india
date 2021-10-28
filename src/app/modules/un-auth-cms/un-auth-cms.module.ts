import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnAuthCmsComponent } from './un-auth-cms.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeModule } from '../../pipes/safe/safe.module';
import { DataLoaderModule } from '../../components/data-loader/data-loader.module';
import { ResultNotFoundModule } from '../../components/result-not-found/result-not-found.module';
import { MatExpansionModule } from '@angular/material';

const inrRoutes: Routes = [
  { path: '', component: UnAuthCmsComponent },
];

@NgModule({
  declarations: [UnAuthCmsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    SafeModule,
    DataLoaderModule,
    ResultNotFoundModule,
    MatExpansionModule,
  ]
})
export class UnAuthCmsModule { }
