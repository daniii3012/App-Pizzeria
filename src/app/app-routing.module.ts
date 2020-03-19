import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { StoreComponent } from './pages/store/store.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './services/guards/auth/auth.guard';
import { EmpleadoGuard } from './services/guards/empleado/empleado.guard';
import { AdminGuard } from './services/guards/admin/admin.guard';
import { ProductDashboardComponent } from './pages/admin/product-dashboard/product-dashboard.component';
import { UserDashboardComponent } from './pages/admin/user-dashboard/user-dashboard.component';
import { PurchaseCompleteComponent } from './pages/purchase/purchase-complete/purchase-complete.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { MeseroComponent } from './pages/store/mesero/mesero.component';
import { CocinaComponent } from './pages/store/cocina/cocina.component';
import { DomicilioComponent } from './pages/store/domicilio/domicilio.component';
import { OrdenCompletaComponent } from './pages/store/mesero/orden-completa/orden-completa.component';
import { OrderDashboardComponent } from './pages/admin/order-dashboard/order-dashboard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'purchase-complete', component: PurchaseCompleteComponent, canActivate: [AuthGuard] },
  { path: 'restaurant', component: StoreComponent, canActivate: [EmpleadoGuard] },
  { path: 'restaurant/waiter', component: MeseroComponent, canActivate: [EmpleadoGuard] },
  { path: 'restaurant/waiter/order-complete', component: OrdenCompletaComponent, canActivate: [EmpleadoGuard] },
  { path: 'restaurant/kitchen', component: CocinaComponent, canActivate: [EmpleadoGuard] },
  { path: 'restaurant/domicilios', component: DomicilioComponent, canActivate: [EmpleadoGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/products', component: ProductDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: UserDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/orders', component:OrderDashboardComponent, canActivate: [AdminGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
