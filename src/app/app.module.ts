import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/user/products/products.component';
import { ShoppingHistoryComponent } from './pages/user/shopping-history/shopping-history.component';
import { PurchaseComponent } from './pages/user/purchase/purchase.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CartComponent } from './pages/user/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingHistoryComponent,
    PurchaseComponent,
    NavbarComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
