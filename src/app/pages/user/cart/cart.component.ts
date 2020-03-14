import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Observable<any[]>;
  products: Observable<any[]>;

  constructor(
    private cartService: CartService,
    public auth: AuthService
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

  deleteProduct(id_cart: string, id_producto: string, producto: any) {
    this.cartService.deleteCartProduct(id_cart, id_producto, producto);
  }

}
