import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { StaffNoID } from "./staff";

export const getAllStaffs = (token:string, page:number) => directusClient.request( withToken(token, readItems('staffs', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalStaffs = (token:string) => directusClient.request( withToken(token, aggregate('staffs', { aggregate: { count: '*' } })) ); 
export const staffExistChecker = (token:string, idCardNumber = '', familyIDNumber = '') => 
	directusClient.request( 
		withToken(token, readItems('staffs', { 
			filter: {
				_or: [
					{
						id_card_number: { _eq: idCardNumber }
					},
					{
						family_id_number: { _eq: familyIDNumber }
					}
				]
			} 
		})) 
	);

export const createAStaff = (token:string, staff:StaffNoID) => 
	directusClient.request( withToken(token, createItem('staffs', staff)) );
export const updateAStaff = (token:string, id:number, data:object) =>
	directusClient.request( withToken(token, updateItem('staffs', id, data)) );
export const deleteAStaff = (token:string, id:number) =>
	directusClient.request( withToken(token, deleteItem('staffs', id)) );

export const getStaffsInOrg = (token:string) => directusClient.request( withToken(token, readItems('staff_organizations', { fields: ['*.*'] })) );

export const searchStaffs = (token:string, query:string, page:number) => directusClient.request( withToken(token, readItems('staffs', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page })));
export const getTotalSearchStaffs = (token:string, query:string) => directusClient.request( withToken(token, readItems('staffs', { search: query, aggregate: { count: '*' } })));
