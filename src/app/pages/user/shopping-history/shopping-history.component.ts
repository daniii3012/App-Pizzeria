import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeOrderService } from 'src/app/services/home-order/home-order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.css']
})
export class ShoppingHistoryComponent implements OnInit {

  pedidos: Observable<any[]>

  constructor(
    private homeOrderService: HomeOrderService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.pedidos = this.homeOrderService.getPedidoById(auth.uid)
      }
    )
  }

}
