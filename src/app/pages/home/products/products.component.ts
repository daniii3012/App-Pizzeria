import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<any[]>;
  stock: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  // Timer
  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
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
        //console.log(data_product);
        this.cartService.addCart(data_product);
        this.resolveAfter2Seconds().then(value => {
          this.cartService.addCartProduct(data_product);
        });        
      }
    )
    this.productService.deleteProductStock(product.id_producto);
  }

}
