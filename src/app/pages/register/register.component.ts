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
  alias: string;
  userID: string; 
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  rol: string;

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
    this.rol = 'cliente'
    this.auth.register(
      this.email, 
      this.password, 
      this.alias,
      this.userID,
      this.nombre,
      this.apellido,
      this.telefono,
      this.direccion,
      this.rol
    )
  }

}
