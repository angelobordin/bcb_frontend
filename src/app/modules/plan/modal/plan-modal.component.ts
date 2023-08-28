import { Subject, takeUntil } from 'rxjs';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatChipsModule } from '@angular/material/chips';
import { Plan } from 'app/core/interfaces/plan';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { CustomerService } from 'app/modules/customer/list/customer.service';
import { Customer } from 'app/core/interfaces/customer';

interface Data {
	action: string;
	row: Plan;
}

@Component({
	standalone: true,
	selector: 'plan-modal',
	templateUrl: './plan-modal.component.html',
	styleUrls: ['./plan-modal.component.scss'],
	imports: [
		NgxMaskPipe,
		MatIconModule,
		FormsModule,
		MatFormFieldModule,
		NgClass,
		MatInputModule,
		TextFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSelectModule,
		MatOptionModule,
		MatChipsModule,
		CommonModule,
		FuseAlertComponent,
		NgxMaskDirective,
	],
})
export class PlanModalComponent implements OnInit, OnDestroy {
	form: FormGroup;
	customers: Customer[];
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private _customerService: CustomerService, protected ref: MatDialogRef<PlanModalComponent>, private fb: FormBuilder) {}

	ngOnInit(): void {
		this._customerService.customers$.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
			this.customers = res?.data;
		});

		this.form = this.fb.group({
			customer_id: ['', [Validators.required]],
			plan_type: ['', [Validators.required]],
			credit: [0],
			account_limit: [0],
			spent_limit: [0],
		});

		if (this.data.row) this.form.patchValue(this.data.row);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	cancel() {
		this.ref.close();
	}

	submit() {
		this.ref.close(this.form.value);
	}
}
