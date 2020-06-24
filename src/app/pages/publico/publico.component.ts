import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { TicketsService } from '../../services/tickets.service';
import { isNumber } from 'util';

@Component({
	selector: 'app-publico',
	templateUrl: './publico.component.html',
	styleUrls: [ './publico.component.css' ]
})
export class PublicoComponent implements OnInit {
	llamadas = [];
	last_ten = [];
	constructor(private wsService: WebsocketService, private tktService: TicketsService) {}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('container');
		this.escucharSockets();
		this.actualizarPantalla();
	}

	actualizarPantalla() {
		this.tktService.getAllTickets().subscribe((data: any) => {
			this.llamadas = data.tickets;
			console.log('Cola de tickets', this.llamadas);
			const num_ll = this.llamadas.length;
			let e = 0;
			for (let i = 1; i < num_ll; i++) {
				if (data.tickets[num_ll - i].id_desk !== 0) {
					const at: Ticket = {
						id_ticket: num_ll - i,
						id_desk: Number(data.tickets[num_ll - i].id_desk)
					};
					this.last_ten[e] = at;
					e++;
				}
			}
		});
	}

	escucharSockets() {
		this.wsService.listen('actualizar-pantalla').subscribe((data: any) => {
			const at: Ticket = {
				id_ticket: data.ticket.id_ticket,
				id_desk: data.ticket.id_desk
			};
			this.llamadas.push(at);
			this.last_ten.unshift(at);
			// Construyo un nuevo objeto con los ultimos diez (once con el llamado [0]) elementos para mostrar en la pantalla pública
			const size_llamadas = Object.keys(this.llamadas).length;
			const audio = new Audio();
			audio.src = '../../assets/new-ticket.mp3';
			audio.load();
			audio.play();
		});
	}
}

interface Ticket {
	id_ticket: number;
	id_desk: number;
}
