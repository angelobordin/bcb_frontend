import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { Plan } from 'app/core/interfaces/plan';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PlanService } from './plan.service';
import { ACTION } from 'app/core/enum/action';
import { PlanModalComponent } from '../modal/plan-modal.component';

@Component({
	standalone: true,
	selector: 'plan-list',
	templateUrl: './plan-list.component.html',
	styleUrls: ['./plan-list.component.scss'],
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
export class PlanListComponent implements OnInit, OnDestroy {
	plans$: Observable<CustomerBackendReturn<Plan[]>>;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(private _dialogService: MatDialog, private _service: PlanService, private _fuseConfirmationService: FuseConfirmationService, private _toastr: ToastrService) {}

	ngOnInit(): void {
		this.plans$ = this._service.plans$;
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	registerPlan() {
		this._dialogService
			.open(PlanModalComponent, {
				data: {
					action: ACTION.REGISTER,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;
				this._service
					.registerPlan(e)
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

	editPlan(plan: Plan) {
		this._dialogService
			.open(PlanModalComponent, {
				data: {
					action: ACTION.EDIT,
					row: plan,
				},
			})
			.afterClosed()
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((e) => {
				if (!e || e == null) return;
				this._service
					.updatePlan(plan.id, e)
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

	deletePlan(plan: Plan) {
		const confirmation = this._fuseConfirmationService.open({
			title: 'Deletando Plano do cliente!',
			message: 'Deseja deletar o plano?',
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
					.deletePlan(plan)
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
