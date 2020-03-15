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

  getCart(id_cliente: string){
    this.cartDoc = this.db.doc<any>(`carrito/${id_cliente}`)
    return this.cartDoc.valueChanges();
  }

  getCartProducts(id_cliente: string){
    return this.db.collection('carrito').doc(`${id_cliente}`).collection('productos', order => order.orderBy("nombre", "asc")).snapshotChanges().pipe(map(
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

  addCart(carrito: any) {
    //this.cartCollection.add(carrito);
    const productRef: AngularFirestoreDocument<any> = this.afStore.doc(`carrito/${carrito.id_cliente}`);
    this.afStore.doc<any>(`carrito/${carrito.id_cliente}`).valueChanges().subscribe( // llama a la base de datos usuario
      db => {
        const data: any = {
          id_cliente: carrito.id_cliente
        }
        return productRef.set(data, { merge: true })
      }
    );
  }

  addCartProduct(producto: any) {
    this.db.collection('carrito').doc(`${producto.id_cliente}`).collection('productos').add(producto);
    this.db.collection('carrito').doc(`${producto.id_cliente}`).update({t_precio: firestore.FieldValue.increment(producto.precio)});
    this.db.collection('carrito').doc(`${producto.id_cliente}`).update({n_productos: firestore.FieldValue.increment(1)});
  }

  updateCart(carrito: any) {
    this.cartDoc = this.db.doc(`carrito/${carrito.id}`);
    this.cartDoc.update(carrito);
  }

  deleteCart(id: string) {
    this.cartDoc = this.db.doc(`carrito/${id}`);
    this.cartDoc.delete();
  }

  deleteCartProduct(id_cart: string, id_producto: string, producto: any) {
    this.db.doc(`carrito/${id_cart}/productos/${id_producto}`).delete();
    this.db.collection('carrito').doc(`${id_cart}`).update({t_precio: firestore.FieldValue.increment(-producto.precio)});
    this.db.collection('carrito').doc(`${id_cart}`).update({n_productos: firestore.FieldValue.increment(-1)});
  }
}
