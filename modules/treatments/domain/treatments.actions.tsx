import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { TreatmentCreator } from "./treatment";

export const getAllTreatments = (token:string, page:number) => directusClient.request( withToken(token, readItems('treatments', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalTreatments = (token:string) => directusClient.request( withToken(token, aggregate('treatments', { aggregate: { count: '*' } })) );

export const treatmentExistChecker = (token:string, code = '') => 
	directusClient.request( 
		withToken(token, readItems('treatments', { 
			filter: {
				code: { _eq: code }
			} 
		})) 
	)

export const createATreatment = (token:string, treatment:TreatmentCreator) => 
	directusClient.request( withToken(token, createItem('treatments', treatment)) );
export const updateATreatment = (token:string, id:number, data:object) =>
	directusClient.request( withToken(token, updateItem('treatments', id, data)) );
export const deleteATreatment = (token:string, id:number) =>
	directusClient.request( withToken(token, deleteItem('treatments', id)) );

export const searchTreatments = (token:string, query:string, page:number) => directusClient.request( withToken(token, readItems('treatments', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page })));
export const getTotalSearchTreatments = (token:string, query:string) => directusClient.request( withToken(token, readItems('treatments', { search: query, aggregate: { count: '*' } })));
