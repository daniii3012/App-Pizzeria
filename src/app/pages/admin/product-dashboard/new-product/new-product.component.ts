import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  id_producto: string;
  nombre: string;
  tipo: string;
  imagen: string;
  precio: number;
  stock: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  agregarProducto(){
    const data = {
      id_producto: this.id_producto,
      nombre: this.nombre,
      tipo: this.tipo,
      imagen: this.imagen,
      precio: this.precio,
      stock: this.stock
    };
    this.productService.addProduct(data);
    this.id_producto = '';
    this.nombre = '';
    this.tipo = ';'
    this.imagen = '';
    this.precio = null;
    this.stock = null;
  }

}
