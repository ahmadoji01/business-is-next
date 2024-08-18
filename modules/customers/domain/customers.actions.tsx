import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler";
import { aggregate, createItem, readItems, updateItems, withToken } from "@directus/sdk";
import { Customer } from "./customer";

export const getAllCustomers = (token:string, page:number, fields?:string[]) =>
    directusClient.request( withToken(token, readItems('customers', { fields: fields? fields:['*.*'], limit: LIMIT_PER_PAGE, page } )) );
export const getAllCustomersWithFilter = (token:string, filter:object, fields?:string[]) =>
    directusClient.request( withToken(token, readItems('customers', { filter, fields: fields? fields:['*.*'] } )) );
export const getCustomersWithFilter = (token:string, filter:object, page:number, fields?:string[]) =>
	directusClient.request( 
		withToken(token, readItems('customers', { 
			filter: filter,
			fields: fields? fields:['*.*'], limit: LIMIT_PER_PAGE, page
		})) 
	);
export const getTotalCustomersWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, aggregate('customers', { aggregate: { count: '*' }, query: { filter } })) );

export const searchCustomersWithFilter = (token:string, query:string, filter:object, page:number, fields?:string[]) =>
	directusClient.request(
		withToken(token, readItems('customers', { fields: fields? fields:['*.*'], search: query, filter: filter, limit: LIMIT_PER_PAGE, page }))
	)
export const getTotalSearchCustomersWithFilter = (token:string, query:string, filter:object) => 
    directusClient.request( withToken(token, readItems('customers', { filter: filter, search: query, aggregate: { count: '*' } })));

export const updateManyCustomers = (token:string, customerIDs:string[], field:object) =>
	directusClient.request( withToken(token, updateItems('customers', customerIDs, field)) );

export const createACustomer = async (token:string, customer:Customer, organization:string) => {
	const { id, ...cust } = customer;
	let custToInsert = Object.assign(cust, { organization });
	directusClient.request( withToken(token, createItem('customers', custToInsert)) );
}