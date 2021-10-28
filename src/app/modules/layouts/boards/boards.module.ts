import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD, EDIT } from '../../../constants/routes';

const inrRoutes: Routes = [
  {
    path: '', component: BoardsComponent, children: [
      { path: '', loadChildren: () => import('./pages/board-listing/board-listing.module').then(m => m.BoardListingModule) },
      { path: ADD, loadChildren: () => import('./pages/add-edit-boards/add-edit-boards.module').then(m => m.AddEditBoardsModule) },
      { path: `${EDIT}/:boardId`, loadChildren: () => import('./pages/add-edit-boards/add-edit-boards.module').then(m => m.AddEditBoardsModule) },
      { path: ':boardId', loadChildren: () => import('./pages/board-details/board-details.module').then(m => m.BoardDetailsModule) }
    ]
  }
];

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes)
  ]
})
export class BoardsModule { }
