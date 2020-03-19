import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos/productos.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {

  addProducto: boolean = false;
  updateProducto: boolean = false;
  updatingProducto: any;

  id_producto: string;
  nombre: string;
  imagen: string;
  tipo: string = 'Tipo de Producto';
  precio: number;
  stock: number;

  productos: Observable<any[]>

  constructor(
    private productosService: ProductosService,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
  }

  agregarProducto() {
    const data = {
      id_producto: this.id_producto,
      nombre: this.nombre,
      tipo: this.tipo,
      imagen: this.imagen,
      precio: this.precio,
      stock: this.stock
    };
    this.productosService.addProducto(data);
    this.id_producto = '';
    this.nombre = '';
    this.tipo = ';'
    this.imagen = '';
    this.precio = null;
    this.stock = null;
    this.addProducto = false;
  }

  update(producto: any){
    this.updatingProducto = producto;
    window.scrollTo(0, 0);
    this.updateProducto = true;
  }

  modificarProducto(producto: any) {
    const data = {
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      stock: producto.stock
    }
    this.productosService.updateProducto(producto);
    this.updateProducto = false;
  }

  eliminarProducto(id: string){
    this.productosService.deleteProducto(id);
  }

}
