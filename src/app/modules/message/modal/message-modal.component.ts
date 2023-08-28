import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Customer } from 'app/core/interfaces/customer';
import { Plan } from 'app/core/interfaces/plan';
import { CustomerService } from 'app/modules/customer/list/customer.service';
import { NgxMaskPipe, NgxMaskDirective } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';

interface Data {
	action: string;
	row: Plan;
}

@Component({
	standalone: true,
	selector: 'message-modal',
	templateUrl: './message-modal.component.html',
	styleUrls: ['./message-modal.component.scss'],
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
export class MessageModalComponent implements OnInit, OnDestroy {
	form: FormGroup;
	customers: Customer[];
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private _customerService: CustomerService, protected ref: MatDialogRef<MessageModalComponent>, private fb: FormBuilder) {}

	ngOnInit(): void {
		this._customerService.customers$.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
			this.customers = res?.data;
		});

		this.form = this.fb.group({
			customer_id: ['', [Validators.required]],
			text: ['', [Validators.required]],
			value: ['', [Validators.required]],
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
