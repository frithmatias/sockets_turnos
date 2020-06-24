import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
	selector: 'app-escritorio',
	templateUrl: './escritorio.component.html',
	styleUrls: [ './escritorio.component.css' ]
})
export class EscritorioComponent implements OnInit {
	id_desk: number;
	id_ticket: number;
	message: string;
	loading: boolean = false;
	constructor(
		private activatedRoute: ActivatedRoute,
		private _tktService: TicketsService,
		private wsService: WebsocketService
	) {
		this.activatedRoute.params.subscribe((data) => {
			console.log('DATA', data);
			this.id_desk = data.id;
		});
	}

	ngOnInit() {}

	atenderTicket() {
		this._tktService.atenderTicket(this.id_desk).subscribe((resp: any) => {
			console.log(resp);

			if (!resp.ticket) {
				console.log('No hay tickets en espera.', resp);
				this.message = 'No hay tickets en espera';
			} else {
				this.wsService.emit('actualizar-pantalla', resp);
				this.id_ticket = resp.ticket.id_ticket;
				this.message = '';
			}
		});
	}
}
