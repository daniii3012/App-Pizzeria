import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { RecibosService } from 'src/app/services/recibos/recibos.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pedidosPendientes: Observable<any[]>
  pedidosCompletados: Observable<any[]>

  verPedidosPendientes: boolean = false;
  verPedidosCompletados: boolean = false;

  constructor(
    private pedidosService: PedidosService,
    private recibosService: RecibosService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if(auth){
          this.pedidosPendientes = this.pedidosService.getPedidosPendientesById(auth.uid);
          this.pedidosCompletados = this.recibosService.getRecibosById(auth.uid);
        }
      }
    );
  }

}
