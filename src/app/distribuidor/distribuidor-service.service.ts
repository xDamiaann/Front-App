import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistribuidorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPedidosPendientes(id_distribuidor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedido/pendientes/${id_distribuidor}`);
  }

  updateEstadoPedido(id_pedido: number, id_estadopedido: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/${id_pedido}/estado`, { id_estadopedido });
  }
}