import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos: Observable<any[]>;
  stock: boolean;

  constructor(
    private productosService: ProductosService,
    private cartService: CartService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.productos = this.productosService.getProductosByType('Pizza');
  }

  productosByType(tipo: string){
    this.productos = this.productosService.getProductosByType(tipo);
  }

  addCart(product: any){
    this.auth.afAuth.authState.subscribe(
      auth => {
        const data_product = {
          idCliente: auth.uid,
          idProducto: product.id_producto,
          nombre: product.nombre,
          precio: product.precio
        }
        this.cartService.addCartProduct(data_product);       
      }
    )
    this.productosService.deleteProductoStock(product.id_producto);
  }

}
