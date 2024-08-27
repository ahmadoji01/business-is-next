import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler";
import { readItems, withToken } from "@directus/sdk";

export const searchAssetsWithFilter = (token:string, query:string, filter:object, page:number, fields?:string[]) =>
	directusClient.request(
		withToken(token, readItems('assets', { fields: fields? fields:['*.*'], search: query, filter: filter, limit: LIMIT_PER_PAGE, page }))
	)

export const getTotalSearchAssetsWithFilter = (token:string, query:string, filter:object) => 
    directusClient.request( withToken(token, readItems('assets', { filter: filter, search: query, aggregate: { count: '*' } })));
