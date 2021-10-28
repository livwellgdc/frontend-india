import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ADD, EDIT } from 'src/app/constants/routes';
import { StoriesComponent } from './stories.component';

const innerRoutes: Routes = [
  { 
    path:"", component: StoriesComponent, children : [
      { path: "", loadChildren: () => import("./pages/stories-list/stories-list.module").then(m => m.StoriesListModule) },
      { path: ADD, loadChildren: () => import("./pages/add-edit-stories/add-edit-stories.module").then(m => m.AddEditStoriesModule)},
      { path: `${EDIT}/:storyId`, loadChildren: () => import("./pages/add-edit-stories/add-edit-stories.module").then(m => m.AddEditStoriesModule)},
      { path: ":storyId", loadChildren: () => import("./pages/stories-details/stories-detils.module").then(m => m.StoriesDetilsModule)}
    ]
  }
]

@NgModule({
  declarations: [ StoriesComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes)
  ]
})
export class StoriesModule { }
