import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { Patient, PatientNoID, PatientPatcher } from "./patient";

export const getAllPatients = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalPatients = (token:string) => directusClient.request( withToken(token, aggregate('patients', { aggregate: { count: '*' } })) );
export const getPatientsToBeExamined = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );

export const patientExistChecker = (token:string, idCardNumber = '', familyIDNumber = '') => 
	directusClient.request( 
		withToken(token, readItems('patients', { 
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
	)

export const getPatientsWithFilter = (token:string, filter:object) => 
	directusClient.request( 
		withToken(token, readItems('patients', { fields: ['*.*'],
			filter: filter
		})) 
	)
    
export const createAPatient = (token:string, patient:PatientNoID) => 
	directusClient.request( withToken(token, createItem('patients', patient)) );

export const searchPatients = (token:string, query:string, page:number) =>
	directusClient.request(
		withToken(token, readItems('patients', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page }))
	);
export const getTotalSearchPatients = (token:string, query:string) =>
	directusClient.request(
		withToken(token, readItems('patients', { fields: ['*.*'], search: query, aggregate: { count: "*" } }))
	);

export const updateAPatient = (token:string, id:number, data:object) => 
	directusClient.request( withToken(token, updateItem('patients', id, data)) );

export const deleteAPatient = (token:string, id:number) => 
	directusClient.request( withToken(token, deleteItem('patients', id)) );