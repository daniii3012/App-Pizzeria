import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class HomeOrderService {

  pedidoCollection: AngularFirestoreCollection<any>;
  pedidoDoc: AngularFirestoreDocument<any>;
  pedido: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.pedidoCollection = this.db.collection('pedido', order => order.orderBy("f_pedido", "desc"));
  }

  getPedidos(){
    return this.pedidoCollection.snapshotChanges().pipe(map(
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

  getPedidosPendientes(){
    return this.db.collection('pedido', order => order.orderBy("f_pedido", "desc")
    .where("estado", "==", false)).snapshotChanges().pipe(map(
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

  getPedidoById(id_cliente: string){
    return this.db.collection('pedido', order => order.orderBy("f_pedido", "desc")
    .where("id_cliente", "==", `${id_cliente}`)).snapshotChanges().pipe(map(
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

  addPedido(pedido: any) {
    this.pedidoCollection.add(pedido);
  }

  addPedidoProduct(producto: any) {
    this.db.collection('pedido').doc(`${producto.id_cliente}`).collection('productos').add(producto);
  }

  updatePedido(pedido: any) {
    this.pedidoDoc = this.db.doc(`pedido/${pedido.id}`);
    this.pedidoDoc.update(pedido);
  }

  deletePedido(id: string) {
    this.pedidoDoc = this.db.doc(`pedido/${id}`);
    this.pedidoDoc.delete();
  }
}
