import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesDetailsComponent } from './classes-details.component';
import { Routes, RouterModule } from '@angular/router';
import { BookedClassUsersComponent } from './_components/booked-class-users/booked-class-users.component';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { ClassService } from '../../_service/class.service';
import { SeatsArrangementModule } from '../../../../../components/seats-arrangement/seats-arrangement.module';
import { ShowImageModule } from '../../../../../components/show-image/show-image.module';


const inrRoutes: Routes = [
  {
    path: '', component: ClassesDetailsComponent
  }
];

@NgModule({
  declarations: [ClassesDetailsComponent, BookedClassUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    ShowDescriptionModule,
    SeatsArrangementModule,
    ShowImageModule
  ],
  providers: [ClassService]
})
export class ClassesDetailsModule { }
