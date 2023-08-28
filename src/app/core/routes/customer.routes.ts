const routeBase = 'http://localhost:3000/';

export const ROUTE_CUSTOMER_LIST = routeBase.concat('customer');
export const ROUTE_CUSTOMER_REGISTER = routeBase.concat('customer');
export const ROUTE_CUSTOMER_DELETE_BY_ID = (id: string) => {
	return routeBase.concat(`customer/${id}`);
};
export const ROUTE_CUSTOMER_UPDATE_BY_ID = (id: string) => {
	return routeBase.concat(`customer/${id}`);
};
