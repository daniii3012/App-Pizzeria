import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  nombreUsuario: string;
  userId: string; 
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;

  constructor(
    public auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe(
      user => {
        if(user){
          this.router.navigate(['/home']);
        }
      }
    )
  }

  agregarUsuario(){
    this.auth.register(
      this.email, 
      this.password, 
      this.nombreUsuario,
      this.userId,
      this.nombres,
      this.apellidos,
      this.telefono,
      this.direccion
    )
  }

}
