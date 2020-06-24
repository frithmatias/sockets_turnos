import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EscritorioComponent } from './pages/escritorio/escritorio.component';
import { HomeComponent } from './pages/home/home.component';
import { NuevoTicketComponent } from './pages/nuevo-ticket/nuevo-ticket.component';
import { PublicoComponent } from './pages/publico/publico.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment.prod';

import { HttpClientModule } from '@angular/common/http';

// SOCKETS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DomseguroPipe } from './pipes/domseguro.pipe';
const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
	declarations: [ AppComponent, EscritorioComponent, HomeComponent, NuevoTicketComponent, PublicoComponent, DomseguroPipe ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config) ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
