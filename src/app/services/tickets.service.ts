import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class TicketsService {
	constructor(private _http: HttpClient) {}

	nuevoTicket() {
		return this._http.get(environment.url + '/nuevoticket');
	}

	atenderTicket(id_desk: number) {
		const url = environment.url + '/atenderticket/' + id_desk;
		return this._http.get(url);
	}

	getAllTickets() {
		const url = environment.url + '/getalltickets';
		return this._http.get(url);
	}
}
