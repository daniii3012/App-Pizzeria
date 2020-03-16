import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notification: number;
  rol: string;

  constructor(
    public auth: AuthService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        this.cartService.getCart(auth.uid).subscribe(
          data => this.notification = data.n_productos
        );
        if (auth) {
          this.auth.getUserRole(auth.uid).subscribe(
            userRole => this.rol = userRole.rol
          )
        }
      }
    )
  }

}
