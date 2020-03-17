import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCollection: AngularFirestoreCollection<any>;
  cartDoc: AngularFirestoreDocument<any>;
  cart: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.cartCollection = this.db.collection('carrito', order => order.orderBy("nombre", "asc"));
  }

  getCart(idCliente: string){
    this.cartDoc = this.db.doc<any>(`carrito/${idCliente}`)
    return this.cartDoc.valueChanges();
  }

  getCartProducts(idCliente: string){
    return this.db.collection('carrito').doc(`${idCliente}`).collection('productos', order => order.orderBy("nombre", "asc")).snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ))
  }

  addCart(idCliente: any) {
    //this.cartCollection.add(carrito);
    const productRef: AngularFirestoreDocument<any> = this.afStore.doc(`carrito/${idCliente}`);
    this.afStore.doc<any>(`carrito/${idCliente}`).valueChanges().subscribe( // llama a la base de datos carrito
      db => {
        const data: any = {
          idCliente: idCliente,
          precioTotal: 0,
          numProductos: 0
        }
        return productRef.set(data, { merge: true })
      }
    );
  }
  
  addCartProduct(producto: any) {
    this.db.collection('carrito').doc(`${producto.idCliente}`).collection('productos').add(producto);
    this.db.collection('carrito').doc(`${producto.idCliente}`).update({precioTotal: firestore.FieldValue.increment(producto.precio)});
    this.db.collection('carrito').doc(`${producto.idCliente}`).update({numProductos: firestore.FieldValue.increment(1)});
  }

  updateCart(carrito: any) {
    this.cartDoc = this.db.doc(`carrito/${carrito.idCliente}`);
    this.cartDoc.update(carrito);
  }

  deleteCart(idCliente: string) {
    this.cartDoc = this.db.doc(`carrito/${idCliente}`);
    this.cartDoc.delete();
  }

  deleteCartProduct(idCliente: string, idProducto: string, producto: any) {
    this.db.doc(`carrito/${idCliente}/productos/${idProducto}`).delete();
    this.db.collection('carrito').doc(`${idCliente}`).update({precioTotal: firestore.FieldValue.increment(-producto.precio)});
    this.db.collection('carrito').doc(`${idCliente}`).update({numProductos: firestore.FieldValue.increment(-1)});
  }

  deleteCartProducts(idCliente: string, idProducto: string) {
    this.db.doc(`carrito/${idCliente}/productos/${idProducto}`).delete();
  }
}
