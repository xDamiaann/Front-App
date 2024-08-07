import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'] // Corregido: styleUrl -> styleUrls
})
export class NoticiasComponent {
  currentDate: Date = new Date();

  constructor(private router: Router) { }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }
  navigateToAbout() {
    this.router.navigate(['about']);
  }
  navigateToShop() {
    this.router.navigate(['shop']);
  }
  navigateToContacto() {
    this.router.navigate(['contacto']);
  }

  navigateToNoticias() {
    this.router.navigate(['noticias']);
  }

}