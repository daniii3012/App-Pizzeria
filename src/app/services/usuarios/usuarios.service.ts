import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuariosCollection: AngularFirestoreCollection<any>;
  usuariosDoc: AngularFirestoreDocument<any>;
  usuarios: Observable<any[]>;

  constructor(
    private db: AngularFirestore
    ) {
    this.usuariosCollection = this.db.collection('usuarios', order => order.orderBy("nombres", "asc"));
  }

  /* Funcion para obtener los usuarios */
  getUsuarios(){
    return this.usuariosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ));
  }

  /* Modificar datos de usuario de la base de datos */
  updateUsuario(usuario: any) {
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.uid}`);
    this.usuariosDoc.update(usuario);
  }
}

