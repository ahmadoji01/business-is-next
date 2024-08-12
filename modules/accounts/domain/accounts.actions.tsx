import { directusClient } from "@/utils/request-handler";
import { readItems, withToken } from "@directus/sdk";

export const getAccountsWithFilter = (token:string, filter:object, fields?:string[]) =>
	directusClient.request( 
		withToken(token, readItems('accounts', { 
			filter: filter,
			fields: fields? fields:['*.*']
		})) 
	);
