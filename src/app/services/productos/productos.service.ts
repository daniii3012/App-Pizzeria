import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productosCollection: AngularFirestoreCollection<any>;
  productosDoc: AngularFirestoreDocument<any>;
  productos: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore
    ) {
    this.productosCollection = this.db.collection('productos', order => order.orderBy("nombre", "asc"));
  }

  /* Funcion para obtener productos */
  getProductos(){
    return this.productosCollection.snapshotChanges().pipe(map(
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

  /*
  getProductoById(id: any){
    return this.db.collection('productos', where => where
    .where("id_producto", "==", `${id}`)).snapshotChanges().pipe(map(
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

  getProductosByType(tipo: string){
    return this.db.collection('productos', order => order.orderBy("nombre", "asc")
    .where("tipo", "==", `${tipo}`)).snapshotChanges().pipe(map(
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
  */

  /* Añadir un nuevo producto a la base de datos */
  addProducto(producto: any) {
    const productRef: AngularFirestoreDocument<any> = this.afStore.doc(`productos/${producto.id_producto}`);
    this.afStore.doc<any>(`productos/${producto.id_producto}`).valueChanges().subscribe( // llama a la base de datos productos
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

  /* Aumentar el stock en 1 (Cuando un cliente lo quita de su carrito) */
  addProductoStock(id_producto: string) {
    this.db.collection('productos').doc(`${id_producto}`).update({stock: firestore.FieldValue.increment(1)});
  }

  /* Modificar producto de la base de datos */
  updateProducto(producto: any) {
    this.productosDoc = this.db.doc(`productos/${producto.id_producto}`);
    this.productosDoc.update(producto);
  }

  /* Eliminar un producto de la base de datos */
  deleteProducto(id_producto: string) {
    this.productosDoc = this.db.doc(`productos/${id_producto}`);
    this.productosDoc.delete();
  }

  /* Disminuye en 1 el stock de un producto (Cuando un cliente lo agrega a su carrito) */
  deleteProductoStock(id_producto: string) {
    this.db.collection('productos').doc(`${id_producto}`).update({stock: firestore.FieldValue.increment(-1)});
  }
}
