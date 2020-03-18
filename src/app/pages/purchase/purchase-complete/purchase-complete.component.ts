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

  susbscription: any; // Permite cerrar el Observable al cambiar de componente, esto con el fin de evitar inconsistencias durante la compra

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

  /* Los productos del carrito se borran en este componente debido al Observable, ya que hacerlo en el anterior al actualizarse generaba un nuevo pedido con n-1 productos */
  borrarProductosCarrito() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.auth.getUserById(auth.uid).subscribe(
          data => {

            if(auth){
              this.susbscription = this.cartService.getCartProducts(auth.uid).subscribe(
                data_products => {
                  /* Elimina los productos del carrito del usuario */
                  for (let i in data_products) {
                    this.cartService.deleteCartProducts(data_products[i].idCliente, data_products[i].id);
                  }
  
                  /* Actualiza los campos de precio y numero de productos del carrito */
                  const data_cart = {
                    idCliente: auth.uid,
                    precioTotal: 0,
                    numProductos: 0
                  }
  
                  this.cartService.updateCart(data_cart);
  
                  /* Redirige al usuario a su pagina de cuenta donde podra ver su pedido */
                  setTimeout(() => (this.router.navigate(['/user/'])), 2000);
  
                }
              );
            }

          }
        );
      }
    )
  }

  ngOnDestroy(){
    this.susbscription.unsubscribe();
  }

}
