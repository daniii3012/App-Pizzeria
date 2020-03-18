import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedidosCollection: AngularFirestoreCollection<any>;
  pedidosDoc: AngularFirestoreDocument<any>;
  pedidos: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.pedidosCollection = this.db.collection('pedidos', order => order.orderBy("fechaPedido", "desc"));
  }

  /* Obtiene todos los pedidos de la base de datos */
  getPedidos(){
    return this.pedidosCollection.snapshotChanges().pipe(map(
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

  /* Obtiene los pedidos no entregados (estado == false) */
  getPedidosPendientes(){
    return this.db.collection('pedidos', order => order.orderBy("fechaPedido", "desc")
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

  /* Obtiene un pedido por su id */
  getPedidoById(idCliente: string){
    return this.db.collection('pedidos', order => order.orderBy("fechaPedido", "desc")
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

  addPedido(pedido: any) {
    this.pedidosCollection.add(pedido);
  }

  addPedidoProduct(producto: any) {
    this.db.collection('pedidos').doc(`${producto.idCliente}`).collection('productos').add(producto);
  }

  updatePedido(pedido: any) {
    this.pedidosDoc = this.db.doc(`pedidos/${pedido.id}`);
    this.pedidosDoc.update(pedido);
  }

  deletePedido(id: string) {
    this.pedidosDoc = this.db.doc(`pedidos/${id}`);
    this.pedidosDoc.delete();
  }
}
