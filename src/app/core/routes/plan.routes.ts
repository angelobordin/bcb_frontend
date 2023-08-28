const routeBase = 'http://localhost:3000/';

export const ROUTE_PLAN_LIST = routeBase.concat('plan');
export const ROUTE_PLAN_REGISTER = routeBase.concat('plan');
export const ROUTE_PLAN_UPDATE_BY_ID = (id: string) => {
	return routeBase.concat(`plan/${id}`);
};
export const ROUTE_PLAN_DELETE_BY_ID = (id: string) => {
	return routeBase.concat(`plan/${id}`);
};
