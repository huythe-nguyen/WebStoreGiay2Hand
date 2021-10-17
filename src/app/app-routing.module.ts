import { NewsComponent } from './admin/news/news.component';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './admin/product/product.component';
import { BrandsComponent } from './admin/brands/brands.component';
import { SalesComponent } from './admin/sales/sales.component';
import { UserProfileComponent } from './admin/userProfile/userProfile.component';

const routes: Routes = [
  { path: 'admin', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'userprofile', component: UserProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
