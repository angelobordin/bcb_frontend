import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, tap, switchMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { Customer } from 'app/core/interfaces/customer';
import { ROUTE_CUSTOMER_DELETE_BY_ID, ROUTE_CUSTOMER_LIST, ROUTE_CUSTOMER_REGISTER, ROUTE_CUSTOMER_UPDATE_BY_ID } from 'app/core/routes/customer.routes';

@Injectable({ providedIn: 'root' })
export class CustomerService {
	private _customers: BehaviorSubject<CustomerBackendReturn<Customer[]> | null> = new BehaviorSubject(null);

	constructor(private httpClient: HttpClient) {}

	get customers$(): Observable<CustomerBackendReturn<Customer[]>> {
		return this._customers.asObservable();
	}

	getCustomerList(): Observable<CustomerBackendReturn<Customer[]>> {
		return this.httpClient.get<CustomerBackendReturn<Customer[]>>(ROUTE_CUSTOMER_LIST).pipe(
			tap((res) => {
				this._customers.next(res);
			})
		);
	}

	registerCustomer(customer: Customer): Observable<CustomerBackendReturn<Customer>> {
		return this.customers$.pipe(
			take(1),
			switchMap((customers) =>
				this.httpClient.post<CustomerBackendReturn<Customer>>(ROUTE_CUSTOMER_REGISTER, customer).pipe(
					map((result) => {
						this._customers.next({
							status: result.status,
							message: result.message,
							data: [result.data, ...customers.data],
						});
						return result;
					})
				)
			)
		);
	}

	updateCustomer(customer: Customer): Observable<CustomerBackendReturn<Customer>> {
		return this.customers$.pipe(
			take(1),
			switchMap((customers) =>
				this.httpClient.put<CustomerBackendReturn<Customer>>(ROUTE_CUSTOMER_UPDATE_BY_ID(customer.id.toString()), customer).pipe(
					map((result) => {
						const index = customers.data.findIndex((item) => item.id === customer.id);

						customers.data[index] = result.data;
						this._customers.next(customers);

						return result;
					})
				)
			)
		);
	}

	deleteCustomer(customer: Customer): Observable<CustomerBackendReturn<null>> {
		return this.customers$.pipe(
			take(1),
			switchMap((customers) =>
				this.httpClient.delete<CustomerBackendReturn<null>>(ROUTE_CUSTOMER_DELETE_BY_ID(customer.id.toString())).pipe(
					map((result) => {
						const index = customers.data.findIndex((item) => item.id === customer.id);

						customers.data.splice(index, 1);
						this._customers.next(customers);

						return result;
					})
				)
			)
		);
	}
}
