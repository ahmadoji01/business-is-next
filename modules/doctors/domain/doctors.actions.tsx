import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, deleteItem, readItem, readItems, updateItem, updateItems, withToken } from "@directus/sdk";
import { DoctorNoID } from "./doctor";

export const getAllDoctors = (token:string, page:number) => directusClient.request( withToken(token, readItems('doctors', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalDoctors = (token:string) => directusClient.request( withToken(token, aggregate('doctors', { aggregate: { count: '*' } })) );

export const doctorExistChecker = (token:string, licenseNumber = '') => 
	directusClient.request( 
		withToken(token, readItems('doctors', { 
			filter: {
				_or: [
					{
						license_number: { _eq: licenseNumber }
					}
				]
			} 
		})) 
	)
    
export const createADoctor = (token:string, doctor:DoctorNoID) => 
	directusClient.request( withToken(token, createItem('doctors', doctor)) );
export const updateADoctor = (token:string, id:string, data:object) =>
	directusClient.request( withToken(token, updateItem('doctors', id, data)) );
export const deleteADoctor = (token:string, id:string) =>
	directusClient.request( withToken(token, deleteItem('doctors', id)) );

export const getDoctorsInOrg = (token:string) => directusClient.request( withToken(token, readItems('doctors_organizations', { fields: ['*.*'] })) );
export const getADoctorOrg = (token:string, filter:object) => directusClient.request( withToken(token, readItems('doctors_organizations', { fields: ['*.*'], filter: filter} ) ));
export const getPresentDoctors = (token:string, fields?:string[]) => 
	directusClient.request( withToken(token, readItems('doctors_organizations', 
		{ fields: fields? fields:['*.*'], filter: { status: { _eq: "present" } } 
	})) )
export const updateADoctorOrg = (token:string, id:number, data:object) => 
	directusClient.request( withToken(token, updateItem('doctors_organizations', id, data)) );
export const updateDoctorOrgs = (token:string, ids:string[], data:object) =>
	directusClient.request( withToken(token, updateItems('doctors_organizations', ids, data)) );

export const searchDoctors = (token:string, query:string, page:number) => directusClient.request( withToken(token, readItems('doctors', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page })));
export const getTotalSearchDoctors = (token:string, query:string) => directusClient.request( withToken(token, readItems('doctors', { search: query, aggregate: { count: '*' } })));
export const getDoctorsWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, readItems('doctors', { filter })) );