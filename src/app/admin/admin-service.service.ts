import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Presentacion {
  id_presentacion: number;
  nombre: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  actualizarSolicitud(id: number,estado:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/distribuidor/${id}`, {
      "id_estadosolicitud":estado
    });
  }

  cargarEstadosSolicitud() {
    return this.http.get(`${this.apiUrl}/estado-solicitud/`);
  }

  cargarSolicitudes(){
    return this.http.get(`${this.apiUrl}/distribuidor/`);
  }

  cargarParroquias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/parroquia`);
  }

  agregarParroquia(parroquia: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/parroquia`, parroquia);
  }

  editarParroquia(id: number, parroquia: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/parroquia/${id}`, parroquia);
  }

  eliminarParroquia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/parroquia/${id}`);
  }

  cargarBarrios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/barrio`);
  }

  agregarBarrio(barrio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/barrio`, barrio);
  }

  eliminarBarrio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/barrio/${id}`);
  }

  cargarEstadosPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estado-pedido`);
  }

  agregarEstadoPedido(estadoPedido: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estado-pedido`, estadoPedido);
  }

  eliminarEstadoPedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/estado-pedido/${id}`);
  }

  // Métodos para estados de solicitudes
  cargarEstadosSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estado-solicitud`);
  }

  agregarEstadoSolicitud(estadoSolicitud: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estado-solicitud`, estadoSolicitud);
  }

  eliminarEstadoSolicitud(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/estado-solicitud/${id}`);
  }

  //METODOS PARA LOS PRODUCTOS
  cargarProductos(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/producto`);
  }

  obtenerPresentacionesPorProducto(id_producto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/producto/${id_producto}/presentaciones`);
  }


  obtenerPresentacionesPorID(id_presentacion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/presentacion/${id_presentacion}`);
  }

  agregarProducto(producto: any): Observable<any> {
    console.log(producto);
    return this.http.post<any>(`${this.apiUrl}/producto`, producto);
  }

  verificarProducto(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/producto/nombre/${nombre}`);
  }

  agregarProductoPresentacion(productoPresentacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productopresentacion`, productoPresentacion);
  }

  verificarProductoPresentacion(id_producto: number, id_presentacion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productopresentacion/${id_producto}/${id_presentacion}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/producto/${id}`);
  }
  cargarPresentaciones(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/presentacion`);
  }

  agregarPresentacion(presentacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/presentacion`, presentacion);
  }

  eliminarPresentacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/presentacion/${id}`);
  }

  cargarDistribuidores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/distribuidor`);
  }

  cargarDistribuidoresDisponibles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/distribuidores/disponibles`);
  }

  abastecerDistribuidor(abastecer:any):Observable<any>{
    console.log(abastecer);
    return this.http.post<any>(`${this.apiUrl}/productodistribuidor`, abastecer);
  }

  obtenerPresentacionPorProducto(id_producto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/${id_producto}/presentacion`);
  }

  obtenerPresentacionesPorNombreProducto(nombre_producto: string): Observable<Presentacion[]> {
    return this.http.get<Presentacion[]>(`${this.apiUrl}/producto/${nombre_producto}/presentaciones`);
  }
  
}
