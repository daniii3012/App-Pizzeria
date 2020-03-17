import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  updateUsuario: boolean = false;
  updatingUsuario: any;

  uid: string;
  userId: string;
  nombreUsuario: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: number;
  rol: string;

  usuarios: Observable<any[]>

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosService.getUsuarios();
  }

  update(usuario: any) {
    this.updatingUsuario = usuario;
    window.scrollTo(0, 0);
    this.updateUsuario = true;
  }

  modificarUsuario(usuario: any) {
    const data = {
      uid: usuario.uid,
      userId: usuario.userId,
      nombreUsuario: usuario.nombreUsuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      rol: usuario.rol
    }
    this.usuariosService.updateUsuario(usuario);
    this.updateUsuario = false;
  }

}
