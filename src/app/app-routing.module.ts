import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/home/products/products.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { ChefComponent } from './pages/chef/chef.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { AdminGuard } from './services/guards/admin/admin.guard';
import { EmpleadoGuard } from './services/guards/empleado/empleado.guard';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ClienteGuard } from './services/guards/cliente/cliente.guard';
import { UserDashboardComponent } from './pages/admin/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './pages/admin/product-dashboard/product-dashboard.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [ClienteGuard] },
  { path: 'waiter', component: WaiterComponent, canActivate: [EmpleadoGuard] },
  { path: 'kitchen', component: ChefComponent, canActivate: [EmpleadoGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [ClienteGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AdminGuard] },
  { path: 'product-dashboard', component: ProductDashboardComponent, canActivate: [AdminGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
