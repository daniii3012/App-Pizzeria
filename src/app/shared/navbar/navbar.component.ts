import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  rolUsuario: string;

  ngOnInit() {
  }

  getUserRole() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          this.auth.getUserById(auth.uid).subscribe(
            data => this.rolUsuario = data.rol
          )
        }
      }
    )
  }

}
