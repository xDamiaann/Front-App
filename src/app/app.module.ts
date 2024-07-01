import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { DistribuidorHomeComponent } from './distribuidor-home/distribuidor-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SolicitudDistribuidorComponent } from './distribuidor/solicitud-distribuidor/solicitud-distribuidor.component';
import { AdminSolicitudesComponent } from './admin/admin-solicitudes/admin-solicitudes.component';
import { AdminServiceService} from './admin/admin-service.service';
import { AdminParroquiasComponent } from './admin/admin-parroquias/admin-parroquias.component';
import { AdminBarriosComponent } from './admin/admin-barrios/admin-barrios.component';
import { AdminEstadoPedidosComponent } from './admin/admin-estado-pedidos/admin-estado-pedidos.component';
import { AdminEstadoSolicitudesComponent } from './admin/admin-estado-solicitudes/admin-estado-solicitudes.component';
import { AdminPresentacionesComponent } from './admin/admin-presentaciones/admin-presentaciones.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { ClientePedidoComponent } from './cliente/cliente-pedido/cliente-pedido.component';
import { MmodalComponent } from './shared/mmodal/mmodal.component';
import { AdminAbastecerComponent } from './admin/admin-abastecer/admin-abastecer.component';
import { DistribuidorPedidosComponent } from './distribuidor/distribuidor-pedidos/distribuidor-pedidos/distribuidor-pedidos.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteHomeComponent,
    DistribuidorHomeComponent,
    AdminHomeComponent,
    SolicitudDistribuidorComponent,
    AdminSolicitudesComponent,
    AdminParroquiasComponent,
    AdminBarriosComponent,
    AdminEstadoPedidosComponent,
    AdminEstadoSolicitudesComponent,
    AdminPresentacionesComponent,
    AdminProductosComponent,
    MmodalComponent,
    ClientePedidoComponent,
    AdminAbastecerComponent,
    DistribuidorPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule, // Asegúrate de agregar esta línea
    AuthModule,
    NgbModule,
  ],
  providers: [AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
