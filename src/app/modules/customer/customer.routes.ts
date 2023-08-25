import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { RegisterCustomerComponent } from './register/register-customer.component';

export default [
    {
        path: 'register',
        component: RegisterCustomerComponent,
    },
    {
        path: 'list',
        component: HomeComponent,
    },
] as Routes;
