import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../cliente/cliente-service.service';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  username: string = ''; //Inicializar la propiedad
  pedidos: any[] = [];
  idCliente: string = '';


  constructor(private router: Router) { }

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.username = cliente ? cliente.username : '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.router.navigate(['/']);
  }

  //navegar por pedidos
  navigateToPedido() {
    this.router.navigate(['/cliente-pedido']);
  }
}
