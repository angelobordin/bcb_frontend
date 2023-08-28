const routeBase = 'http://localhost:3000/';

export const ROUTE_MESSAGE_LIST = routeBase.concat('message');
export const ROUTE_MESSAGE_REGISTER = routeBase.concat('message');
export const ROUTE_MESSAGE_UPDATE_BY_ID = (id: string) => {
	return routeBase.concat(`message/${id}`);
};
export const ROUTE_MESSAGE_DELETE_BY_ID = (id: string) => {
	return routeBase.concat(`message/${id}`);
};
