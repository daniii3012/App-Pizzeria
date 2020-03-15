import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeOrderService } from 'src/app/services/home-order/home-order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pedidos: Observable<any[]>

  constructor(
    private homeOrderService: HomeOrderService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.pedidos = this.homeOrderService.getPedidos();
  }

}
