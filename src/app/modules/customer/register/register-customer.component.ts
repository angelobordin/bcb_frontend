import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Subject } from 'rxjs';

@Component({
    selector: 'register-custoemr',
    templateUrl: './register-customer.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgClass,
        MatInputModule,
        CommonModule,
        FuseAlertComponent,
        // NgxMaskDirective,
        MatButtonModule,
        TextFieldModule,
        ReactiveFormsModule,
    ],
})
export class RegisterCustomerComponent implements OnInit {
    form: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            cnpj: ['', Validators.required],
            responsible_name: ['', Validators.required],
            responsible_email: ['', Validators.required],
            responsible_cellphone: ['', Validators.required],
            responsible_cpf: ['', Validators.required],
        });
    }
}
