import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from '../layout-parts/_components/sidebar/sidebar.component';
import { AbsoluteRoutingModule } from './../../pipes/absolute-routing/absolute-routing.module';
import { BreadcrumbModule } from './../../components/breadcrumb/breadcrumb.module';
import { HeaderComponent } from '../layout-parts/_components/header/header.component';
import { ConfirmationModalModule } from '../../components/confirmation-modal/confirmation-modal.module';
import { httpInterceptorProviders } from '../../services/interceptor/index';
import { MatToolbarModule, MatSidenavModule, MatMenuModule, MatButtonModule, MatListModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { ADMIN, USERS, DASHBOARD, CLASSES, EVENTS, CATEGORY, ARTICLES, REWARDS, CHALLENGES, BADGES, CMS, FAQ, BANNERS, PROFILE_INTERESTS, LIVWELL_VIDEOS, CLUBS, CLIENT_CLUBS, SUB_ADMINS, VERSIONS, POINTS_DISTRIBUTION, POINTS_DISTRIBUTION_HISTORY, PROMO_MGMT, CORPORATES, GROUPS, SPECIAL_OFFERS, AGE_CALCULATOR, PER_STEP_LWC, BOARDS, POSTS, MANAGE_HEALTH_SCORE, SELES_TRACKER, STORIES, AUDIT_LOG, REPORTS, PAYMENTS, CHARITY, REELS, QUICK_LINKS, DEEP_LINKS, FITNESS_REELS, SUBSCRIPTION_FETURES, SPIN_WHEEL } from '../../constants/routes';
import { ViewPermissionGuard } from '../../services/guards/view-permission/view-permission.guard';
import { PreventSubAdminGuard } from '../../services/guards/prevent-sub-admin/prevent-sub-admin.guard';
import { SECTION_ID_OF } from '../../constants/messages';
import { PermissionModule } from 'src/app/pipes/permission_pipe/permission.module';

const inrRoutes: Routes = [
  {
    path: '', component: LayoutsComponent, children: [
      { path: '', redirectTo: DASHBOARD },
      {
        path: DASHBOARD,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: ADMIN,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: USERS,
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.USERS }
      },
      {
        path: CATEGORY,
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CATEGORIES }
      },
      {
        path: PROFILE_INTERESTS,
        loadChildren: () => import('./profile-interest/profile-interest.module').then(m => m.ProfileInterestModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.INTERESTS }
      },
      {
        path: CLASSES,
        loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CLASSES }
      },
      {
        path: CHALLENGES,
        loadChildren: () => import('./challenges/challenges.module').then(m => m.ChallengesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CHALLENGES }
      },
      {
        path: GROUPS,
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.GROUPS }
      },
      {
        path: EVENTS,
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.EVENTS }
      },
      {
        path: ARTICLES,
        loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.ARTICLES }
      },
      {
        path: REWARDS,
        loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.REWARDS }
      },
      {
        path: PROMO_MGMT,
        loadChildren: () => import('./promo/promo.module').then(m => m.PromoModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: SPECIAL_OFFERS,
        loadChildren: () => import('./special-offers/special-offers.module').then(m => m.SpecialOffersModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: BADGES,
        loadChildren: () => import('./badges/badges.module').then(m => m.BadgesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.BADGES }
      },
      {
        path: BANNERS,
        loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.BANNERS }
      },
      {
        path: CORPORATES,
        loadChildren: () => import('./corporate/corporate.module').then(m => m.CorporateModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: MANAGE_HEALTH_SCORE,
        loadChildren: () => import('./health-score/health-score.module').then(m => m.HealthScoreModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: CLIENT_CLUBS,
        loadChildren: () => import('./client-clubs/client-clubs.module').then(m => m.ClientClubsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CLIENTS }
      },
      {
        path: CLUBS,
        loadChildren: () => import('./clubs/clubs.module').then(m => m.ClubsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CLUBS }
      },
      {
        path: POINTS_DISTRIBUTION,
        loadChildren: () => import('./points-distribution/points-distribution.module').then(m => m.PointsDistributionModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: PER_STEP_LWC,
        loadChildren: () => import('./per-step-lwc/per-step-lwc.module').then(m => m.PerStepLwcModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: POINTS_DISTRIBUTION_HISTORY,
        loadChildren: () => import('./points-history/points-history.module').then(m => m.PointsHistoryModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: LIVWELL_VIDEOS,
        loadChildren: () => import('./livwell-videos/livwell-videos.module').then(m => m.LivwellVideosModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.LIVWELL_VIDEOS }
      },
      {
        path: VERSIONS,
        loadChildren: () => import('./versions/versions.module').then(m => m.VersionsModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: SUB_ADMINS,
        loadChildren: () => import('./sub-admins/sub-admins.module').then(m => m.SubAdminsModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: AGE_CALCULATOR,
        loadChildren: () => import('./age-calculator/age-calculator.module').then(m => m.AgeCalculatorModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: BOARDS,
        loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.MESSAGE_BOARD }
      },
      {
        path: POSTS,
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.MESSAGE_BOARD }
      },
      {
        path: PAYMENTS,
        loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
        canActivate: [PreventSubAdminGuard]
      },
      {
        path: FAQ,
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.FAQ }
      },
      {
        path: CMS,
        loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CMS }
      },
      {
        path: AUDIT_LOG,
        loadChildren: () => import('./audit-log/audit-log.module').then(m => m.AuditLogModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.AUDIT_LOG}
      },
      {
        path: STORIES,
        loadChildren: () => import('./stories/stories.module').then(m => m.StoriesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.STORIES }
      },
      {
        path: REELS,
        loadChildren: () => import('./reels/reels.module').then(m => m.ReelsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.STORIES }
      },
      {
        path: SELES_TRACKER,
        loadChildren: () => import('./seles-tracker/seles-tracker.module').then(m => m.SelesTrackerModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.REFERRAL }
      },
      {
        path: REPORTS,
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.REFERRAL }
      },
      {
        path: CHARITY,
        loadChildren: () => import('./charity/charity.module').then(m => m.CharityModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.CHARITY }
      },
      {
        path: QUICK_LINKS,
        loadChildren: () => import('./quicklinks/quicklinks.module').then(m => m.QuicklinksModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.QUICK_LINKS }
      },
      {
        path: DEEP_LINKS,
        loadChildren: () => import('./deeplinks/deeplinks.module').then(m => m.DeeplinksModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.DEEP_LINKS }
      },
      {
        path: FITNESS_REELS,
        loadChildren: () => import('./fitness-reels/fitness-reels.module').then(m => m.FitnessReelsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.STORIES }
      },
      {
        path: SPIN_WHEEL,
        loadChildren: () => import('./spin-wheels/spin-wheels.module').then(m => m.SpinWheelsModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.SPIN_WHEEL }
      },
      {
        path: SUBSCRIPTION_FETURES,
        loadChildren: () => import('./subscription-features/subscription-features.module').then(m => m.SubscriptionFeaturesModule),
        canActivate: [ViewPermissionGuard],
        data: { roles: SECTION_ID_OF.SUBSCRIPTION_FEATURES }
      },
    ]
  }
];

@NgModule({
  declarations: [LayoutsComponent, HeaderComponent, SidebarComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoutes),
    AbsoluteRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    BreadcrumbModule,
    ConfirmationModalModule,
    MatExpansionModule,
    PermissionModule
,  ],
  providers: [httpInterceptorProviders]
})
export class LayoutsModule { }
