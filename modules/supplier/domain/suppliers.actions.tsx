import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler";
import { readItems, withToken } from "@directus/sdk";

export const searchSuppliersWithFilter = (token:string, query:string, filter:object, page:number, fields?:string[]) =>
	directusClient.request(
		withToken(token, readItems('suppliers', { fields: fields? fields:['*.*'], search: query, filter: filter, limit: LIMIT_PER_PAGE, page }))
	)