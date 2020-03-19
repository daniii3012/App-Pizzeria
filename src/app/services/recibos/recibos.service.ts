import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  recibosCollection: AngularFirestoreCollection<any>;
  recibosDoc: AngularFirestoreDocument<any>;
  recibos: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.recibosCollection = this.db.collection('recibos', order => order.orderBy("fechaPago", "desc"));
  }

  /* Obtiene todos los recibos de la base de datos */
  getRecibos(){
    return this.recibosCollection.snapshotChanges().pipe(map(
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

  /* Obtiene los recibos por id del cliente */
  getRecibosById(idCliente: string){
    return this.db.collection('recibos', order => order.orderBy("fechaPago", "desc")
    .where("idCliente", "==", `${idCliente}`)).snapshotChanges().pipe(map(
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

  addRecibo(recibo: any) {
    this.recibosCollection.add(recibo);
  }

  addReciboProduct(producto: any) {
    this.db.collection('recibos').doc(`${producto.idCliente}`).collection('productos').add(producto);
  }

  updateRecibo(recibo: any) {
    this.recibosDoc = this.db.doc(`recibos/${recibo.id}`);
    this.recibosDoc.update(recibo);
  }

  deleteRecibo(id: string) {
    this.recibosDoc = this.db.doc(`recibos/${id}`);
    this.recibosDoc.delete();
  }
}
