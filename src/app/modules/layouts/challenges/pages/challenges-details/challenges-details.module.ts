import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesDetailsComponent } from './challenges-details.component';
import { Routes, RouterModule } from '@angular/router';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { ChallengeParticipantsComponent } from './_components/challenge-participants/challenge-participants.component';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { ChallengeService } from '../../_service/challenge.service';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';

const inrRoute: Routes = [
  {
    path: '', component: ChallengesDetailsComponent
  }
]

@NgModule({
  declarations: [ChallengesDetailsComponent, ChallengeParticipantsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    ShowDescriptionModule,
    MatTableRendererModule,
    EmptyValueModule
  ],
  providers: [ChallengeService]
})
export class ChallengesDetailsModule { }
