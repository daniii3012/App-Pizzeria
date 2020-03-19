import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {

  pedidos: Observable<any[]>

  constructor(
    private pedidosService: PedidosService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.pedidos = this.pedidosService.getPedidos();
  }

}
