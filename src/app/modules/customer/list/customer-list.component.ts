import { Subject, Observable, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from './customer.service';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { Customer } from 'app/core/interfaces/customer';
import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { fuseAnimations } from '@fuse/animations';
import { NgxMaskPipe } from 'ngx-mask';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModalComponent } from '../modal/customer-modal.component';
import { ACTION } from 'app/core/enum/action';

@Component({
	standalone: true,
	selector: 'customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: fuseAnimations,
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
export class CustomerListComponent implements OnInit, OnDestroy {
	customers$: Observable<CustomerBackendReturn<Customer[]>>;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(private _dialogService: MatDialog, private _service: CustomerService, private _fuseConfirmationService: FuseConfirmationService, private _toastr: ToastrService) {}

	ngOnInit(): void {
		this.customers$ = this._service.customers$;
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	registerCustomer() {
		this._dialogService
			.open(CustomerModalComponent, {
				data: {
					action: ACTION.REGISTER,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;

				this._service
					.registerCustomer(e)
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

	editCustomer(customer: Customer) {
		this._dialogService
			.open(CustomerModalComponent, {
				data: {
					action: ACTION.EDIT,
					row: customer,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;

				this._service
					.updateCustomer(e)
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

	deleteCustomer(customer: Customer) {
		const confirmation = this._fuseConfirmationService.open({
			title: 'Deletando Cliente!',
			message: 'Deseja deletar o cliente?',
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
					.deleteCustomer(customer)
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
