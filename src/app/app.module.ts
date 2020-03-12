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
import { ProductDashboardComponent } from './pages/admin/product-dashboard/product-dashboard.component';
import { UserDashboardComponent } from './pages/admin/user-dashboard/user-dashboard.component';
import { NewOrderComponent } from './pages/waiter/new-order/new-order.component';
import { OrderComponent } from './pages/chef/order/order.component';
import { AdminComponent } from './pages/admin/admin.component';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { ChefComponent } from './pages/chef/chef.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingHistoryComponent,
    PurchaseComponent,
    NavbarComponent,
    CartComponent,
    ProductDashboardComponent,
    UserDashboardComponent,
    NewOrderComponent,
    OrderComponent,
    AdminComponent,
    WaiterComponent,
    ChefComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
