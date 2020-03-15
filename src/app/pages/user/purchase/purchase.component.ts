import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { HomeOrderService } from '../../../services/home-order/home-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  cart: any;
  products: Observable<any[]>;

  precio: number;

  //id_pedido: string;
  id_cliente: string = null;
  precioPedido: number = null;
  payment_method: string = 'Metodo de Pago';
  dirEnvio: string = null;
  estado: boolean = false;

  constructor(
    private cartService: CartService,
    private homeOrderService: HomeOrderService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.cartService.getCart(auth.uid).subscribe(
          data => this.cart = data
        );

        this.products = this.cartService.getCartProducts(auth.uid);
      }
    )
  }

  comprar() {
    var f_pedido = new Date();
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.auth.getUserRole(auth.uid).subscribe(
          userAdress => {
            this.dirEnvio = userAdress.direccion;
            const data = {
              id_cliente: auth.uid,
              cliente: auth.displayName,
              n_productos: this.cart.n_productos,
              precioPedido: this.cart.t_precio,
              metodoPago: this.payment_method,
              dirEnvio: this.dirEnvio,
              f_pedido: f_pedido,
              estado: this.estado
            }
            this.homeOrderService.addPedido(data);
            
            this.cartService.getCartProducts(auth.uid).subscribe(
              data_products => {
                for (let i in data_products) {
                  this.cartService.deleteCartProducts(data_products[i].id_cliente, data_products[i].id);
                }

                const data_cart = {
                  id_cliente: auth.uid,
                  t_precio: 0,
                  n_productos: 0
                }

                this.cartService.updateCart(data_cart);
                this.router.navigate(['/home']);
              }
            );
          }
        );
      }
    )

  }

}
