import { aggregate, createItem, createItems, deleteItem, readItem, readItems, updateItem, updateItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { SalesCreator } from "./sales";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllSales = (token:string, page:number) => directusClient.request( withToken(token, readItems('sales', { fields: ['*.*.*'], limit: LIMIT_PER_PAGE, page })) );
export const createASale = (token:string, sale:SalesCreator) => 
	directusClient.request( withToken(token, createItem('sales', sale)) );

export const getAllOrdersWithFilter = (token:string, filter:object, fields?:string[]) => 
	directusClient.request( withToken(token, readItems('orders', { fields: fields? fields:['*.*.*'], sort: ['sort', 'date_updated'], filter })) );

export const getSalesWithFilter = (token:string, filter:object, page:number, fields?:string[]) => 
	directusClient.request( 
		withToken(token, readItems('sales', { fields: fields? fields:['*.*'], sort: ['sort', '-date_updated'], limit: LIMIT_PER_PAGE, page,
			filter: filter
		})) 
	)
export const getTotalSalesWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, aggregate('sales', { aggregate: { count: '*' }, query: { filter } })) );


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

export const createSales = (token:string, sales:SalesCreator[]) =>
	directusClient.request( withToken(token, createItems('sales', sales)) );

export const createManySales = (token:string, sales:SalesCreator[]) => 
    directusClient.request( withToken(token, createItems('sales', sales)) );

export const updateManySales = (token:string, salesIDs:string[], field:object) =>
	directusClient.request( withToken(token, updateItems('sales', salesIDs, field)) );