import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  realizarPedido(pedido: any): Observable<any> {
    console.log(pedido);
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedido);
  }

  getProductosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/disponibles`);
  }
  /*
    getDistribuidoresDisponibles(pedido: any): Observable<any[]> {
      return this.http.post<any[]>(`${this.apiUrl}/distribuidor/disponibles`, pedido);
    }*/

  obtenerPresentacionesPorID(id_presentacion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/presentacion/${id_presentacion}`);
  }

  getDistribuidoresConStock(pedidoDetalles: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/distribuidor/disponibles`, pedidoDetalles);
  }

}