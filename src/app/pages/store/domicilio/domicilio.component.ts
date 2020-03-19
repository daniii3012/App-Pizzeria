import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { RecibosService } from 'src/app/services/recibos/recibos.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  pedidosPendientes: Observable<any[]>

  constructor(
    private pedidosService: PedidosService,
    private recibosService: RecibosService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.pedidosPendientes = this.pedidosService.getPedidosPendientes();
  }

  entregarPedido(pedidoPendiente: any){
    let fechaPago = new Date();
    const data_recibo = {
      idPedido: pedidoPendiente.id,
      idCliente: pedidoPendiente.idCliente,
      precioTotal: pedidoPendiente.precioPedido,
      modoPago: pedidoPendiente.metodoPago,
      fechaPago: fechaPago
    }
    this.recibosService.addRecibo(data_recibo);

    const data_pedido = {
      id: pedidoPendiente.id,
      estado: !pedidoPendiente.estado
    }
    this.pedidosService.updatePedido(data_pedido);
  }

}
