import { Subject } from 'rxjs';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'app/core/interfaces/customer';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgxMaskDirective } from 'ngx-mask';
import { MatChipsModule } from '@angular/material/chips';

interface Data {
	action: string;
	row: Customer;
}

@Component({
	standalone: true,
	selector: 'customer-modal',
	templateUrl: './customer-modal.component.html',
	styleUrls: ['./customer-modal.component.scss'],
	imports: [
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
export class CustomerModalComponent implements OnInit, OnDestroy {
	form: FormGroup;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(@Inject(MAT_DIALOG_DATA) public data: Data, protected ref: MatDialogRef<CustomerModalComponent>, private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			cnpj: ['', [Validators.required]],
			responsible_name: ['', [Validators.required]],
			responsible_email: ['', [Validators.required]],
			responsible_cellphone: ['', [Validators.required]],
			responsible_cpf: ['', [Validators.required]],
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
