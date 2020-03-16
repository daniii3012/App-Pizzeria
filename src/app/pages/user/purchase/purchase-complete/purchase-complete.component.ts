import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-complete',
  templateUrl: './purchase-complete.component.html',
  styleUrls: ['./purchase-complete.component.css']
})
export class PurchaseCompleteComponent implements OnInit, OnDestroy {

  susbscription: any;

  cart: any;

  constructor(
    private cartService: CartService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.auth.afAuth.authState.subscribe(
      auth => {
        this.cartService.getCart(auth.uid).subscribe(
          data => this.cart = data
        );
      }
    )

    this.borrarProductosCarrito();

  }

  borrarProductosCarrito() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.auth.getUserRole(auth.uid).subscribe(
          data => {

            this.susbscription = this.cartService.getCartProducts(auth.uid).subscribe(
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

                setTimeout(() => (this.router.navigate(['/user/', auth.uid])), 3000);

              }
            );

          }
        );
      }
    )
  }

  ngOnDestroy(){
    this.susbscription.unsubscribe();
  }

}
