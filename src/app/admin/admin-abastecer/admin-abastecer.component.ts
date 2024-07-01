import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

interface Presentacion {
  id_presentacion: number;
  nombre: string;
  precio: number;
}

interface FormData {
  id_distribuidor: number | null;
  id_producto: number | null;
  id_productopresentacion: number | null;
  stock: number | null;
  precio: number | null;
}

@Component({
  selector: 'app-admin-abastecer',
  templateUrl: './admin-abastecer.component.html',
  styleUrls: ['./admin-abastecer.component.css']
})
export class AdminAbastecerComponent implements OnInit {
  formData: FormData = {
    id_distribuidor: null,
    id_producto: null,
    id_productopresentacion: null,
    stock: null,
    precio: null
  };


  
  distribuidores :any= [];
  productos :any= [];
  presentaciones: any[]  = [];

  constructor(
    private AdminService: AdminServiceService,
    
  ) {}

  ngOnInit() {
    this.cargarDistribuidores();
    this.cargarProductos();
  }

  cargarDistribuidores() {
    this.AdminService.cargarDistribuidores().subscribe(
      data => this.distribuidores = data,
      error => console.error(error)
    );
  }

  cargarProductos() {
    this.AdminService.cargarProductos().subscribe(
      data => this.productos = data,
      error => console.error(error)
    );
  }

  
  onProductoChange() {
    if (this.formData.id_producto) {
      this.AdminService.obtenerPresentacionesPorProducto(this.formData.id_producto).subscribe(
        data => {
          this.presentaciones = data;
          // Reset the form data related to presentation when product changes
          this.formData.id_productopresentacion = null;
          this.formData.precio = null;
        },
        error => console.error(error)
      );
    }
  }


  onPresentacionChange() {
    const id=this.formData.id_productopresentacion;
    this.presentaciones.forEach(element => {
      if (element.id_presentacion == this.formData.id_productopresentacion) {
        this.formData.precio = element.Presentacion ? element.Presentacion.precio : element.precio; // Maneja ambos casos
      }
    });
  }


  onSubmit() {
    this.AdminService.abastecerDistribuidor(this.formData).subscribe(
      response => {
        console.log('Abastecimiento exitoso:', response);
      },
      error => {
        console.error('Error en el abastecimiento:', error);
      }
    );
  }
}
