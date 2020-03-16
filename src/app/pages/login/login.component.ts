import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* Variable que indicara si la aplicacion esta instalada */
  installed: boolean = false;
  email: string;
  password: string;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.auth.afAuth.authState.subscribe(
      user => {
        if (user) {
          /* Si el usuario ya se encuentra logueado, se dirigira a la pagina principal */
          this.router.navigate(['/home']);
        }
      }
    )

    /* Detecta si la pagina esta instalada */
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.installed = true;
    }
  }

}
