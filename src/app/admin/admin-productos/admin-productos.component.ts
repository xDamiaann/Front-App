import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];
  presentaciones: any[] = [];
  //distribuidores:any[] = [];
  nuevoProducto = { id_admin: '', nombre: '', descripcion: '', id_presentacion: ''   };

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarPresentaciones();
    //this.cargarDistribuidores();
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.nuevoProducto.id_admin = admin ? admin.id : '';
    }
  }

  cargarProductos() {
    this.adminService.cargarProductos().subscribe(
      data => {
        this.productos = data;
        this.productos.forEach(producto => {
          this.adminService.obtenerPresentacionesPorProducto(producto.id_producto).subscribe(
            presentaciones => {
              producto.presentaciones = presentaciones;
            }
          );
        });
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  cargarPresentaciones() {
    this.adminService.cargarPresentaciones().subscribe(
      data => {
        this.presentaciones = data;
        
      },
      error => {
        console.error('Error al cargar presentaciones:', error);
      }
    );
  }
/*
  cargarDistribuidores() {
    this.adminService.cargarDistribuidores().subscribe(
      data => {
        this.distribuidores = data;
      },
      error => {
        console.error('Error al cargar distribuidores:', error);
      }
    );
  }
*/
agregarProducto() {
  this.adminService.verificarProducto(this.nuevoProducto.nombre).subscribe(
    productoExistente => {
      if (!productoExistente) {
        this.adminService.agregarProducto(this.nuevoProducto).subscribe(
          nuevoProducto => {
            this.adminService.agregarProductoPresentacion({
              id_producto: nuevoProducto.id_producto,
              id_presentacion: +this.nuevoProducto.id_presentacion // Conversión a número
            }).subscribe(() => {
              this.cargarProductos();
              this.resetForm();
            });
          },
          error => {
            console.error('Error al agregar producto:', error);
          }
        );
      } else {
        this.adminService.verificarProductoPresentacion(productoExistente.id_producto, +this.nuevoProducto.id_presentacion).subscribe(
          productoPresentacionExistente => {
            if (!productoPresentacionExistente) {
              this.adminService.agregarProductoPresentacion({
                id_producto: productoExistente.id_producto,
                id_presentacion: +this.nuevoProducto.id_presentacion // Conversión a número
              }).subscribe(() => {
                this.cargarProductos();
                this.resetForm();
              });
            } else {
              alert('El producto con la presentación seleccionada ya existe.');
            }
          }
        );
      }
    },
    error => {
      console.error('Error al verificar producto:', error);
    }
  );
}

resetForm() {
  this.nuevoProducto = { id_admin: '', nombre: '', descripcion: '', id_presentacion: '' };
  (document.getElementById('agregarProductoModal') as HTMLElement).style.display = 'none';
  (document.querySelector('.modal-backdrop') as HTMLElement).remove();
}

  eliminarProducto(id: number) {
    this.adminService.eliminarProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter(p => p.id_producto !== id);
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
}
