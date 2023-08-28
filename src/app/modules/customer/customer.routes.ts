import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CustomerListComponent } from './list/customer-list.component';
import { CustomerService } from './list/customer.service';

export default [
	{
		path: '',
		component: CustomerListComponent,
		resolve: {
			customers: () => inject(CustomerService).getCustomerList().subscribe(),
		},
	},
] as Routes;
