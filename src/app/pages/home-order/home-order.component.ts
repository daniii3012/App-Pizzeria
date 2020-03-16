import { Component, OnInit } from '@angular/core';
import { HomeOrderService } from 'src/app/services/home-order/home-order.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-order',
  templateUrl: './home-order.component.html',
  styleUrls: ['./home-order.component.css']
})
export class HomeOrderComponent implements OnInit {

  pedidos: Observable<any[]>

  constructor(
    private homeOrderService: HomeOrderService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.pedidos = this.homeOrderService.getPedidosPendientes();
  }

  entregarPedido(pedido: any){
    const data = {
      id: pedido.id,
      estado: !pedido.estado
    }
    this.homeOrderService.updatePedido(data);
  }

}
