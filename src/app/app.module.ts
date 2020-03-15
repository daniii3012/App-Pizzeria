import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AuthService } from './services/auth/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
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
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewProductComponent } from './pages/admin/product-dashboard/new-product/new-product.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeProductsComponent } from './pages/home/home-products/home-products.component';

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
    UserComponent,
    LoginComponent,
    RegisterComponent,
    NewProductComponent,
    HomeProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
