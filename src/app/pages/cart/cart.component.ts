import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  productos: Observable<any[]>;

  constructor(
    private cartService: CartService,
    private productosService: ProductosService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if(auth){
          this.cartService.getCart(auth.uid).subscribe(
            data => this.cart = data
          );
          
          this.productos = this.cartService.getCartProducts(auth.uid);
        }
      }
    )
  }

  deleteProducto(idCliente: string, idProducto: string, producto: any) {
    this.cartService.deleteCartProduct(idCliente, idProducto, producto);
    this.productosService.addProductoStock(producto.idProducto);
  }

}
