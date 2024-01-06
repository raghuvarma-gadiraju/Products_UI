import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import {ConvertToSpacePipe} from './shared/convert-to-space.pipe'
import {FormsModule} from '@angular/forms';
import {StarComponent} from './shared/star.component';
import  { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import {RouterModule} from '@angular/router'

@Injectable({providedIn: 'root'})


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacePipe,
    StarComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'products', component: ProductListComponent},
      {path:'products/id', component:ProductDetailComponent},
      {path: 'welcome', component:ProductListComponent}
    ])
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}
