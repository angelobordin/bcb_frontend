import { Observable, Subject, takeUntil } from 'rxjs';
import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { NgxMaskPipe } from 'ngx-mask';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'app/core/interfaces/message';
import { MessageService } from './message.service';
import { MessageModalComponent } from '../modal/message-modal.component';
import { ACTION } from 'app/core/enum/action';

@Component({
	standalone: true,
	selector: 'message-list',
	templateUrl: './message-list.component.html',
	styleUrls: ['./message-list.component.scss'],
	imports: [
		NgIf,
		MatProgressBarModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		NgFor,
		NgTemplateOutlet,
		NgClass,
		MatSlideToggleModule,
		MatOptionModule,
		MatRippleModule,
		AsyncPipe,
		CurrencyPipe,
		NgxMaskPipe,
		MatSortModule,
		MatPaginatorModule,
		MatSelectModule,
		MatCheckboxModule,
	],
})
export class MessageListComponent implements OnInit, OnDestroy {
	messages$: Observable<CustomerBackendReturn<Message[]>>;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(private _dialogService: MatDialog, private _service: MessageService, private _fuseConfirmationService: FuseConfirmationService, private _toastr: ToastrService) {}

	ngOnInit(): void {
		this.messages$ = this._service.messages$;
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	registerMessage() {
		this._dialogService
			.open(MessageModalComponent, {
				data: {
					action: ACTION.REGISTER,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;
				this._service
					.registerMessage(e)
					.pipe(takeUntil(this._unsubscribeAll))
					.subscribe(
						(result) => {
							this._toastr.success('Sucesso!', result.message, { timeOut: 3000 });
						},
						(err) => {
							this._toastr.error('Erro', err.error.detail, { timeOut: 3000 });
						}
					);
			});
	}

	editMessage(message: Message) {
		this._dialogService
			.open(MessageModalComponent, {
				data: {
					action: ACTION.EDIT,
					row: message,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;
				this._service
					.updateMessage(message.id, e)
					.pipe(takeUntil(this._unsubscribeAll))
					.subscribe(
						(result) => {
							this._toastr.success('Sucesso!', result.message, { timeOut: 3000 });
						},
						(err) => {
							this._toastr.error('Erro', err.error.detail, { timeOut: 3000 });
						}
					);
			});
	}

	deleteMessage(message: Message) {
		const confirmation = this._fuseConfirmationService.open({
			title: 'Deletando Mensagem!',
			message: 'Deseja deletar a mensagem?',
			actions: {
				confirm: {
					label: 'Deletar',
				},
				cancel: {
					label: 'Cancelar',
				},
			},
		});

		confirmation
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;

				this._service
					.deleteMessage(message)
					.pipe(takeUntil(this._unsubscribeAll))
					.subscribe(
						(result) => {
							this._toastr.success('Sucesso!', result.message, { timeOut: 3000 });
						},
						(err) => {
							this._toastr.error('Erro', err.error.detail, { timeOut: 3000 });
						}
					);
			});
	}

	formatDate(data: string): string {
		const dateObj = new Date(data);
		const dia = dateObj.getUTCDate().toString().padStart(2, '0');
		const mes = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa de 0
		const ano = dateObj.getUTCFullYear();

		return `${dia}/${mes}/${ano}`;
	}
}
