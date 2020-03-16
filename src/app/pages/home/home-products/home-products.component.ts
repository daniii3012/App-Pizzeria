import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {

  products: Observable<any[]>;
  stock: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.products = this.productService.getHomeProducts();
  }

  addCart(product: any){
    this.auth.afAuth.authState.subscribe(
      auth => {
        const data_product = {
          id_cliente: auth.uid,
          id_product: product.id_producto,
          nombre: product.nombre,
          precio: product.precio
        }
        this.cartService.addCartProduct(data_product);     
      }
    )
    this.productService.deleteProductStock(product.id_producto);
  }

}
