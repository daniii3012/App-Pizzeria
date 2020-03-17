import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notification: number;
  rolUsuario: string;

  constructor(
    public auth: AuthService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.getUserRole();

  }

  getUserRole() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          this.cartService.getCart(auth.uid).subscribe(
            data => this.notification = data.numProductos
          );
          this.auth.getUserById(auth.uid).subscribe(
            data => this.rolUsuario = data.rol
          )
        }
      }
    )
  }

}
