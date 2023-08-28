import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { CustomerService } from './modules/customer/list/customer.service';

export const appRoutes: Route[] = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{
		path: '',
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		resolve: {
			initialData: initialDataResolver,
		},
		children: [
			{
				path: 'home',
				loadChildren: () => import('app/modules/home/home.routes'),
			},
			{
				path: 'customer',
				loadChildren: () => import('app/modules/customer/customer.routes'),
			},
			{
				path: 'plan',
				loadChildren: () => import('app/modules/plan/plan.routes'),
			},
			{
				path: 'message',
				loadChildren: () => import('app/modules/message/message.routes'),
			},
		],
	},
	{ path: '**', redirectTo: 'home' },
];
