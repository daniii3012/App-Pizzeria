import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesero',
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css']
})
export class MeseroComponent implements OnInit, OnDestroy {

  susbscription: any; // Permite cerrar el Observable al cambiar de componente, esto con el fin de evitar inconsistencias durante la orden

  cart: any;
  productos: Observable<any[]>;
  productosOrden: Observable<any[]>;
  stock: boolean;

  ordenEnProceso: boolean;
  verOrden:boolean = false;

  idCliente: string = null; // En realidad es el id del empleado que realiza la orden, pero en la base de datos ya tiene como nombre idCliente
  precioPedido: number = null;
  metodoPago: string = 'Metodo de Pago';
  dirEnvio: string = "Restaurante";
  estado: boolean = false;

  constructor(
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private cartService: CartService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if(auth){
          this.cartService.getCart(auth.uid).subscribe(
            data => this.cart = data
          );
          
          this.productosOrden = this.cartService.getCartProducts(auth.uid);
        }
      }
    );

    this.ordenEnProceso = false;
    this.susbscription = null;
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

  deleteProducto(idCliente: string, idProducto: string, producto: any) {
    this.cartService.deleteCartProduct(idCliente, idProducto, producto);
    this.productosService.addProductoStock(producto.idProducto);
  }

  ordenar() {
    this.ordenEnProceso = true;

    var fechaPedido = new Date();

    this.auth.afAuth.authState.subscribe(
      auth => {
        this.auth.getUserById(auth.uid).subscribe(
          data_user => {

            if(auth){
              /* Entra al carrito del empleado para agregar los productos al pedido */
              this.susbscription = this.cartService.getCartProducts(auth.uid).subscribe(
                data_products => {
                  
                  const data = {
                    idCliente: auth.uid,
                    nombreCliente: auth.displayName,
                    productos: data_products, // Asigna los productos del carrito al pedido
                    precioPedido: this.cart.precioTotal,
                    metodoPago: this.metodoPago,
                    dirEnvio: this.dirEnvio,
                    fechaPedido: fechaPedido,
                    estado: this.estado
                  }
                  /* Añade el pedido del usuario */
                  this.pedidosService.addPedido(data);
  
                }
              );
            }

            /* Espera 2 segundos antes de proceder con la orden, solo por integridad de datos */
            setTimeout(() => (this.router.navigate(['/restaurant/waiter/order-complete/'])), 2000);

          }
        );
      }
    )
  }

  /* Al cambiar de componente cierra el Observable para evitar inconsistencias en la orden */
  ngOnDestroy() {
    if (this.susbscription != null) {
      this.susbscription.unsubscribe();
    }
  }

}
