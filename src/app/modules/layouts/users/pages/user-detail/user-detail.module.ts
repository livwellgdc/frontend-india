import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { BadgeEarnedComponent } from './_components/badge-earned/badge-earned.component';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { UserService } from '../../_service/user.service';
import { TabsModule } from '../../../../../components/tabs/tabs.module';
import { BADGE_EARNED, BLOCKCHAIN_CHALLENGE_DATA, BLOCKCHAIN_HEALTH_DATA } from '../../../../../constants/routes';
import { BlockchainChallengeDataComponent } from './_components/blockchain-challenge-data/blockchain-challenge-data.component';
import { BlockchainHealthDataComponent } from './_components/blockchain-health-data/blockchain-health-data.component';
import { PreventSubAdminGuard } from '../../../../../services/guards/prevent-sub-admin/prevent-sub-admin.guard';

const inrRoutes: Routes = [
  {
    path: '', component: UserDetailComponent, children: [
      { path: BADGE_EARNED, component: BadgeEarnedComponent },
      { path: BLOCKCHAIN_CHALLENGE_DATA, component: BlockchainChallengeDataComponent, canActivate: [PreventSubAdminGuard] },
      { path: BLOCKCHAIN_HEALTH_DATA, component: BlockchainHealthDataComponent, canActivate: [PreventSubAdminGuard] },
      { path: '', redirectTo: BADGE_EARNED },
    ]
  }
];


@NgModule({
  declarations: [UserDetailComponent, BadgeEarnedComponent, BlockchainChallengeDataComponent, BlockchainHealthDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    MatTableRendererModule,
    TabsModule
  ],
  providers: [UserService]
})
export class UserDetailModule { }
