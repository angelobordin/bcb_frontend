import { Routes } from '@angular/router';
import { PlanListComponent } from './list/plan-list.component';
import { inject } from '@angular/core';
import { PlanService } from './list/plan.service';
import { CustomerService } from '../customer/list/customer.service';

export default [
	{
		path: '',
		component: PlanListComponent,
		resolve: {
			customers: () => inject(CustomerService).getCustomerList(),
			plans: () => inject(PlanService).getPlanList(),
		},
	},
] as Routes;
