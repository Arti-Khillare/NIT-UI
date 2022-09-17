import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'category/add',
    component: AddCategoryComponent,
  },
  {
    path: 'category/edit/:id',
    component: AddCategoryComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product/add',
    component: AddProductComponent,
  },
  {
    path: 'product/edit/:id',
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
