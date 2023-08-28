import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { MessageListComponent } from './list/message-list.component';
import { MessageService } from './list/message.service';
import { CustomerService } from '../customer/list/customer.service';

export default [
	{
		path: '',
		component: MessageListComponent,
		resolve: {
			customers: () => inject(CustomerService).getCustomerList(),
			messages: () => inject(MessageService).getMessageList(),
		},
	},
] as Routes;
