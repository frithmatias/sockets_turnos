import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
	selector: 'app-nuevo-ticket',
	templateUrl: './nuevo-ticket.component.html',
	styleUrls: [ './nuevo-ticket.component.css' ]
})
export class NuevoTicketComponent implements OnInit {
	ticketNum: number;
	loading: boolean;

	constructor(private tktService: TicketsService) {}

	ngOnInit() {}

	nuevoTicket() {
		this.loading = true;
		this.tktService.nuevoTicket().subscribe((data: any) => {
			console.log(data);
			this.ticketNum = data.ticket.id_ticket;
		});
		this.loading = false;
	}
}
