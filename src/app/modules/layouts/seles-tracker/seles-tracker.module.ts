import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelesTrackerComponent } from './seles-tracker.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { NumberModule } from 'src/app/directives/number/number.module';
import { MatTableRendererModule } from 'src/app/components/mat-table-renderer';
import { TabsModule } from 'src/app/components/tabs/tabs.module';
import { AssignedCodesListComponent } from './pages/assigned-codes-list/assigned-codes-list.component';

const innerRoutes: Routes = [
  {
    path: '', component: SelesTrackerComponent
  },
]

@NgModule({
  declarations: [SelesTrackerComponent, AssignedCodesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(innerRoutes),
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NumberModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableRendererModule,
    TabsModule
  ]
})
export class SelesTrackerModule { }
