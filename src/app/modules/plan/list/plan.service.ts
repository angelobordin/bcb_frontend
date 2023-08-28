import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomerBackendReturn } from 'app/core/interfaces/customerBackendReturn';
import { Plan } from 'app/core/interfaces/plan';
import { HttpClient } from '@angular/common/http';
import { ROUTE_PLAN_DELETE_BY_ID, ROUTE_PLAN_LIST, ROUTE_PLAN_REGISTER, ROUTE_PLAN_UPDATE_BY_ID } from 'app/core/routes/plan.routes';

@Injectable({ providedIn: 'root' })
export class PlanService {
	private _plans: BehaviorSubject<CustomerBackendReturn<Plan[]> | null> = new BehaviorSubject(null);

	constructor(private httpClient: HttpClient) {}

	get plans$(): Observable<CustomerBackendReturn<Plan[]>> {
		return this._plans.asObservable();
	}

	getPlanList(): Observable<CustomerBackendReturn<Plan[]>> {
		return this.httpClient.get<CustomerBackendReturn<Plan[]>>(ROUTE_PLAN_LIST).pipe(
			tap((res) => {
				this._plans.next(res);
			})
		);
	}

	registerPlan(plan: Plan): Observable<CustomerBackendReturn<Plan>> {
		return this.plans$.pipe(
			take(1),
			switchMap((plans) =>
				this.httpClient.post<CustomerBackendReturn<Plan>>(ROUTE_PLAN_REGISTER, plan).pipe(
					map((result) => {
						this._plans.next({
							status: result.status,
							message: result.message,
							data: [result.data, ...plans.data],
						});
						return result;
					})
				)
			)
		);
	}

	updatePlan(id: number, plan: Plan): Observable<CustomerBackendReturn<Plan>> {
		return this.plans$.pipe(
			take(1),
			switchMap((plans) =>
				this.httpClient.put<CustomerBackendReturn<Plan>>(ROUTE_PLAN_UPDATE_BY_ID(id.toString()), plan).pipe(
					map((result) => {
						const index = plans.data.findIndex((item) => item.id === id);
						plans.data[index] = result.data;
						this._plans.next({
							...result,
							data: plans.data,
						});

						return result;
					})
				)
			)
		);
	}

	deletePlan(plan: Plan): Observable<CustomerBackendReturn<null>> {
		return this.plans$.pipe(
			take(1),
			switchMap((plans) =>
				this.httpClient.delete<CustomerBackendReturn<null>>(ROUTE_PLAN_DELETE_BY_ID(plan.id.toString())).pipe(
					map((result) => {
						const index = plans.data.findIndex((item) => item.id === plan.id);

						plans.data.splice(index, 1);
						this._plans.next(plans);

						return result;
					})
				)
			)
		);
	}
}
