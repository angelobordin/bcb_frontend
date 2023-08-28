import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { Message } from 'app/core/interfaces/message';
import { ROUTE_MESSAGE_DELETE_BY_ID, ROUTE_MESSAGE_LIST, ROUTE_MESSAGE_REGISTER, ROUTE_MESSAGE_UPDATE_BY_ID } from 'app/core/routes/message.routes';

@Injectable({ providedIn: 'root' })
export class MessageService {
	private _messages: BehaviorSubject<CustomerBackendReturn<Message[]> | null> = new BehaviorSubject(null);

	constructor(private httpClient: HttpClient) {}

	get messages$(): Observable<CustomerBackendReturn<Message[]>> {
		return this._messages.asObservable();
	}

	getMessageList(): Observable<CustomerBackendReturn<Message[]>> {
		return this.httpClient.get<CustomerBackendReturn<Message[]>>(ROUTE_MESSAGE_LIST).pipe(
			tap((res) => {
				this._messages.next(res);
			})
		);
	}

	registerMessage(message: Message): Observable<CustomerBackendReturn<Message>> {
		return this.messages$.pipe(
			take(1),
			switchMap((messages) =>
				this.httpClient.post<CustomerBackendReturn<Message>>(ROUTE_MESSAGE_REGISTER, message).pipe(
					map((result) => {
						this._messages.next({
							status: result.status,
							message: result.message,
							data: [result.data, ...messages.data],
						});
						return result;
					})
				)
			)
		);
	}

	updateMessage(id: number, message: Message): Observable<CustomerBackendReturn<Message>> {
		return this.messages$.pipe(
			take(1),
			switchMap((messages) =>
				this.httpClient.put<CustomerBackendReturn<Message>>(ROUTE_MESSAGE_UPDATE_BY_ID(id.toString()), message).pipe(
					map((result) => {
						const index = messages.data.findIndex((item) => item.id === id);
						messages.data[index] = result.data;
						this._messages.next({
							...result,
							data: messages.data,
						});

						return result;
					})
				)
			)
		);
	}

	deleteMessage(message: Message): Observable<CustomerBackendReturn<null>> {
		return this.messages$.pipe(
			take(1),
			switchMap((messages) =>
				this.httpClient.delete<CustomerBackendReturn<null>>(ROUTE_MESSAGE_DELETE_BY_ID(message.id.toString())).pipe(
					map((result) => {
						const index = messages.data.findIndex((item) => item.id === message.id);

						messages.data.splice(index, 1);
						this._messages.next(messages);

						return result;
					})
				)
			)
		);
	}
}
