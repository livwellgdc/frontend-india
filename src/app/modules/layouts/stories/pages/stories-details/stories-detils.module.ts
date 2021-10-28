import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesDetailsComponent } from './stories-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowDescriptionModule } from 'src/app/components/show-description/show-description.module';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { EmptyValueModule } from 'src/app/pipes/empty-value/empty-value.module';

const innerRoutes: Routes = [
  { path: "", component: StoriesDetailsComponent }
]

@NgModule({
  declarations: [ StoriesDetailsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    ShowDescriptionModule,
    MatTableRendererModule,
    EmptyValueModule
  ]
})
export class StoriesDetilsModule { }
