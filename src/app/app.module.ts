import { EditBrandsComponent } from './admin/brands/edit-brands/edit-brands.component';
import { AddBrandsComponent } from './admin/brands/add-brands/add-brands.component';
import { EditNewsComponent } from './admin/news/edit-news/edit-news.component';
import { AddNewsComponent } from './admin/news/add-news/add-news.component';
import { NewsComponent } from './admin/news/news.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';

import { ProductComponent } from './admin/product/product.component';
import { HomeComponent } from './admin/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './admin/message/message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { BrandsComponent } from './admin/brands/brands.component';
import { UserProfileComponent } from './admin/userProfile/userProfile.component';
import { SalesComponent } from './admin/sales/sales.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    MessageComponent,
    LoginComponent,
    ProductAddComponent,
    DialogExampleComponent,
    AddProductComponent,
    EditProductComponent,
    NewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    BrandsComponent,
    AddBrandsComponent,
    EditBrandsComponent,
    UserProfileComponent,
    SalesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [RestApiService,DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
