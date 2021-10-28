import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableRendererComponent } from './mat-table-renderer.component';
import { MatOptionModule, MatTooltipModule, MatSelectModule, MatCardModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatSortModule, MatButtonToggleModule, MatMenuModule } from '@angular/material';
import { SearchRendererModule } from '../search-renderer/search-renderer.module';
import { TableService } from './table.service';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';
import { ResultNotFoundModule } from '../result-not-found';
import { FilterModule } from './filter/filter.module';
import { FormatStatusModule } from '../../pipes/format-status/format-status.module';
import { EmptyValueModule } from '../../pipes/empty-value/empty-value.module';
import { LazyImageModule } from '../lazy-image/lazy-image.module';
import { DataLoaderModule } from '../data-loader/data-loader.module';
import { RouterModule } from '@angular/router';
import { FormatMemberShipModule } from '../../pipes/format-member-ship/format-member-ship.module';
import { ShowCouponCodesModule } from '../show-coupon-codes/show-coupon-codes.module';
import { UrboxModule } from '../urbox-toggle-button/urbox.module';
import { SendmailModule } from '../sendmail/sendmail.module';
import { PermissionModule } from 'src/app/pipes/permission_pipe/permission.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [MatTableRendererComponent],
  imports: [
    CommonModule,
    SearchRendererModule,
    RouterModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    ConfirmationModalModule,
    ResultNotFoundModule,
    FilterModule,
    FormatStatusModule,
    EmptyValueModule,
    LazyImageModule,
    MatButtonToggleModule,
    DataLoaderModule,
    MatMenuModule,
    FormatMemberShipModule,
    ShowCouponCodesModule,
    UrboxModule,
    SendmailModule,
    PermissionModule,
    MatCheckboxModule
  ],
  exports: [
    MatTableRendererComponent,
    CommonModule,
    SearchRendererModule,
    RouterModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    ResultNotFoundModule,
    FilterModule,
    FormatStatusModule,
    EmptyValueModule,
    LazyImageModule,
    MatButtonToggleModule,
    DataLoaderModule,
    MatMenuModule
  ],
  providers: [TableService]
})
export class MatTableRendererModule { }
