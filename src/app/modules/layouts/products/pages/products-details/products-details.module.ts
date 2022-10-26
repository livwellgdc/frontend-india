import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailsComponent } from './products-details.component';
import { Routes, RouterModule } from '@angular/router';
import { ShowDescriptionModule } from '../../../../../components/show-description/show-description.module';
import { MatTableRendererModule } from '../../../../../components/mat-table-renderer/mat-table-renderer.module';
import { EmptyValueModule } from '../../../../../pipes/empty-value/empty-value.module';
import { ProductService } from '../../_service/product.service';

const inrRoute: Routes = [
  {
    path: '', component: ProductsDetailsComponent
  }
]

@NgModule({
  declarations: [ProductsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inrRoute),
    ShowDescriptionModule,
    MatTableRendererModule,
    EmptyValueModule
  ],
  providers: [ProductService]
})
export class ProductsDetailsModule { }
