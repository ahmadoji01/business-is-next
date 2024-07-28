import { aggregate, createItem, deleteItem, readItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { MedicalRecordCreator } from "./medical-record";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { MR_STATUS } from "./medical-records.constants";

export const createAMedicalRecord = (token:string, medicalRecord:MedicalRecordCreator) => 
	directusClient.request( withToken(token, createItem('medical_records', medicalRecord)) )
export const updateAMedicalRecord = (token:string, id:string, data:object) => directusClient.request( withToken(token, updateItem('medical_records', id, data)));
export const getAllMedicalRecords = (token:string, page:number) => directusClient.request( withToken(token, readItems('medical_records', { fields: ['*.*'], sort: ['sort', '-date_updated'], limit: LIMIT_PER_PAGE, page })) );
export const getAMedicalRecord = (token:string, id:string) => directusClient.request( withToken(token, readItem('medical_records', id, { fields: ['*.*.*'] })));
export const deleteAMedicalRecord = (token:string, id:string) => directusClient.request( withToken(token, deleteItem('medical_records', id)));
export const getTotalMedicalRecords = (token:string) => directusClient.request( withToken(token, aggregate('medical_records', { aggregate: { count: '*' } })) );
export const getCompleteMedicalRecords = (token:string, patientId: string, fields?:string[]) => 
	directusClient.request( withToken(token, readItems('medical_records', { fields: fields? fields:['*.*'], sort: ['sort', '-date_updated'], 
		filter: 
			{ _and: 
				[ 
					{ status: { _eq: MR_STATUS.complete } }, 
					{ patient: { _eq: patientId } }
				] 
			} 
		}) 
	));

export const searchMedicalRecords = (token:string, filter:object, page:number) => directusClient.request( withToken(token, readItems('medical_records', { fields: ['*.*.*'], sort: ['sort', '-date_updated'], filter: filter, limit: LIMIT_PER_PAGE, page })) );

export const getMedicalRecordsWithFilter = (token:string, filter:object, page:number) => 
	directusClient.request( withToken(token, readItems('medical_records', { fields: ['*.*.*'], sort: ['sort', '-date_updated'], 
		filter: filter
	}) 
));
export const getTotalMedicalRecordsWithFilter = (token:string, filter:object) =>
	directusClient.request( withToken(token, aggregate('medical_records', { aggregate: { count: '*' }, query: { filter } })) );	
