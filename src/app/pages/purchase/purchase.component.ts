import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos/pedidos.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  susbscription: any; // Permite cerrar el Observable al cambiar de componente, esto con el fin de evitar inconsistencias durante la compra

  compraEnProceso: boolean;

  cart: any;
  productos: Observable<any[]>;

  precio: number;

  idCliente: string = null;
  precioPedido: number = null;
  metodoPago: string = 'Metodo de Pago';
  dirEnvio: string = null;
  estado: boolean = false;

  constructor(
    private cartService: CartService,
    private pedidosService: PedidosService,
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
  
          this.productos = this.cartService.getCartProducts(auth.uid);
        }
      }
    )

    this.compraEnProceso = false;
    this.susbscription = null;

  }

  comprar() {
    this.compraEnProceso = true;

    var fechaPedido = new Date();

    this.auth.afAuth.authState.subscribe(
      auth => {
        this.auth.getUserById(auth.uid).subscribe(
          data_user => {

            if(auth){
              /* Entra al carrito del usuario para agregar los productos al pedido */
              this.susbscription = this.cartService.getCartProducts(auth.uid).subscribe(
                data_products => {
  
                  this.dirEnvio = data_user.direccion;
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

            /* Espera 2 segundos antes de proceder con la compra, solo por integridad de datos */
            setTimeout(() => (this.router.navigate(['/purchase-complete/'])), 2000);

          }
        );
      }
    )
  }

  volver() {
    this.susbscription = null;
    this.router.navigate(['/cart'])
  }

  /* Al cambiar de componente cierra el Observable para evitar inconsistencias en la compra */
  ngOnDestroy() {
    if (this.susbscription != null) {
      this.susbscription.unsubscribe();
    }
  }

}
