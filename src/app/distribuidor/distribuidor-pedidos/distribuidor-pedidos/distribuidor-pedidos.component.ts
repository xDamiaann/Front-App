import { Component, OnInit } from '@angular/core';
import { DistribuidorService } from '../../distribuidor-service.service';


@Component({
  selector: 'app-distribuidor-pedidos',
  templateUrl: './distribuidor-pedidos.component.html',
  styleUrls: ['./distribuidor-pedidos.component.css']
})
export class DistribuidorPedidosComponent implements OnInit {
  pedidos: any[] = [];
  idDistribuidor: number = 0;

  constructor(
    private distribuidorService: DistribuidorService,
  ) { }

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('cliente');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.idDistribuidor = distribuidor ? distribuidor.id : '';
    }
    this.cargarPedidosPendientes();
  }

  cargarPedidosPendientes() {
    this.distribuidorService.getPedidosPendientes(this.idDistribuidor).subscribe(
      data => {
        this.pedidos = data;
        console.log(this.pedidos);
      },
      error => {
        console.error('Error al cargar pedidos pendientes:', error);
      }
    );
  }

  actualizarEstadoPedido(id_pedido: number, estado: string) {
    const id_estadopedido = estado === 'Aceptar' ? 2 : 3; // 2: Aceptado, 3: Rechazado
    this.distribuidorService.updateEstadoPedido(id_pedido, id_estadopedido).subscribe(
      () => {
        this.cargarPedidosPendientes(); // Recargar la lista de pedidos pendientes
      },
      error => {
        console.error('Error al actualizar estado del pedido:', error);
      }
    );
  }
}
