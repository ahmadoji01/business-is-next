import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, deleteItem, readItems, updateItem, updateItems, withToken } from "@directus/sdk";
import { MedicineCreator } from "./medicine";

export const getAllMedicines = (token:string, page:number) => directusClient.request( withToken(token, readItems('medicines', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalMedicines = (token:string) => directusClient.request( withToken(token, aggregate('medicines', { aggregate: { count: '*' } })) );
export const medicineExistChecker = (token:string, name = "") => 
	directusClient.request( 
		withToken(token, readItems('medicines', { 
			filter: {
				name: { _eq: name }
			} 
		})) 
	);

export const createAMedicine = (token:string, medicine:MedicineCreator) => 
    directusClient.request( withToken(token, createItem('medicines', medicine)) );
export const updateAMedicine = (token:string, id:number, data:object) =>
	directusClient.request( withToken(token, updateItem('medicines', id, data)) );
export const deleteAMedicine = (token:string, id:number) =>
	directusClient.request( withToken(token, deleteItem('medicines', id)) );

export const searchMedicines = (token:string, query:string, page:number) =>
	directusClient.request(
		withToken(token, readItems('medicines', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page }))
	)
export const getTotalSearchMedicines = (token:string, query:string) => directusClient.request( withToken(token, readItems('medicines', { search: query, aggregate: { count: '*' } })));
