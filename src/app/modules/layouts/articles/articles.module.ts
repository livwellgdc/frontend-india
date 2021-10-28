import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';


const inrRoutes: Routes = [
  {
    path: '', component: ArticlesComponent, children: [
      { path: '', loadChildren: () => import('./pages/articles-listing/articles-listing.module').then(m => m.ArticlesListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-articles/add-edit-articles.module').then(m => m.AddEditArticlesModule) },
      { path: `${EDIT}/:articleId`, loadChildren: () => import('./pages/add-edit-articles/add-edit-articles.module').then(m => m.AddEditArticlesModule) },
      { path: ':articleId', loadChildren: () => import('./pages/articles-details/articles-details.module').then(m => m.ArticlesDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class ArticlesModule { }
