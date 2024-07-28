import { aggregate, createItem, deleteItem, readItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { OrderCreator } from "./order";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllOrders = (token:string, page:number) => directusClient.request( withToken(token, readItems('orders', { fields: ['*.*.*'], limit: LIMIT_PER_PAGE, page })) );
export const createAnOrder = (token:string, order:OrderCreator) => 
	directusClient.request( withToken(token, createItem('orders', order)) );

export const getAllOrdersWithFilter = (token:string, filter:object, fields?:string[]) => 
	directusClient.request( withToken(token, readItems('orders', { fields: fields? fields:['*.*.*'], sort: ['sort', 'date_updated'], filter })) );

export const getOrdersWithFilter = (token:string, filter:object, page:number, fields?:string[]) => 
	directusClient.request( 
		withToken(token, readItems('orders', { fields: fields? fields:['*.*.*'], sort: ['sort', '-date_updated'], limit: LIMIT_PER_PAGE, page,
			filter: filter
		})) 
	)
export const getTotalOrdersWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, aggregate('orders', { aggregate: { count: '*' }, query: { filter } })) );


export const getAnOrder = (token:string, id:string) => 
	directusClient.request( 
		withToken(token, readItem('orders', id, { fields: ['*.*.*'] }))
	)

export const updateOrder = (token:string, id:string, data:object) => directusClient.request( withToken(token, updateItem('orders', id, data)));
export const deleteAnOrder = (token:string, id:string) => directusClient.request( withToken(token, deleteItem('orders', id)) );
export const deleteAnOrderItem = (token:string, id:string) => directusClient.request( withToken(token, deleteItem('order_items', id)) );

export const getQuantityCountByItems = (token:string, filter:object) =>
	directusClient.request( withToken(token, aggregate('order_items', { aggregate: { sum: ['quantity'] }, groupBy: ['item'], query: { filter, limit: 5, sort: ['-sum.quantity']  } })) );

export const getTotalSales = (token:string, filter:object, groupBy:string) =>
	directusClient.request( withToken(token, aggregate('orders', { aggregate: { sum: ['total'] }, groupBy: [groupBy], query: { filter } })) );