import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<any>;
  productsDoc: AngularFirestoreDocument<any>;
  products: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.productsCollection = this.db.collection('producto', order => order.orderBy("nombre", "asc"));
  }

  getProducts(){
    return this.productsCollection.snapshotChanges().pipe(map(
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

  addProduct(producto: any) {
    //this.productsCollection.add(producto);
    const productRef: AngularFirestoreDocument<any> = this.afStore.doc(`producto/${producto.id_producto}`);
    this.afStore.doc<any>(`producto/${producto.id_producto}`).valueChanges().subscribe( // llama a la base de datos usuario
      db => {
        const data: any = {
          id_producto: producto.id_producto,
          nombre: producto.nombre,
          tipo: producto.tipo,
          imagen: producto.imagen,
          precio: producto.precio,
          stock: producto.stock
        }
        return productRef.set(data, { merge: true })
      }
    );
  }

  addProductStock(id_producto: string) {
    this.db.collection('producto').doc(`${id_producto}`).update({stock: firestore.FieldValue.increment(1)});
  }

  updateProduct(producto: any) {
    this.productsDoc = this.db.doc(`producto/${producto.id}`);
    this.productsDoc.update(producto);
  }

  deleteProduct(id: string) {
    this.productsDoc = this.db.doc(`producto/${id}`);
    this.productsDoc.delete();
  }

  deleteProductStock(id_producto: string) {
    this.db.collection('producto').doc(`${id_producto}`).update({stock: firestore.FieldValue.increment(-1)});
  }
}
