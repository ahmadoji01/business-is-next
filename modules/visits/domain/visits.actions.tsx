import { aggregate, createItem, deleteItem, readItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { VisitCreator } from "./visit";

export const createAVisit = (token:string, visit:VisitCreator) => 
	directusClient.request( withToken(token, createItem('visits', visit)) )

export const getAllVisits = (token:string, page:number) => directusClient.request( withToken(token, readItems('visits', { fields: ['*.*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalVisits = (token:string) => directusClient.request( withToken(token, aggregate('visits', { aggregate: { count: '*' } })) );

export const getVisitByDoctorID = (token:string, doctorID = 0) => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: ['*.*.*'], sort: [ 'sort', 'queue_number' ],
			filter: {
				doctor: { _eq: doctorID }
			} 
		})) 
	)

export const getTotalQueueByDoctorID = (token:string, doctorID = "") => 
	directusClient.request( 
		withToken(token, readItems('visits', {
			filter: {
				_and: [
					{ doctor: { _eq: doctorID } },
					{ _or: [ { status: { _eq: 'waiting' } }, { status: { _eq: 'temporary_leave' } }, { status: { _eq: 'examining' } }, { status: { _eq: 'to_be_examined' } }, { status: { _eq: 'waiting_to_pay' } }, { status: { _eq: 'active' } } ] }
				]
			}, 
		aggregate: { count: '*' } })) 
	)

export const getVisitByStatus = (token:string, status = "") => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: ['*.*.*'],
			filter: {
				status: { _eq: status }
			} 
		})) 
	)
export const getVisitsWithFilter = (token:string, filter:object, sort:string, page:number, fields?:string[]) => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: fields? fields:['*.*.*'], sort: ['sort', sort],
			filter: filter,
		limit: LIMIT_PER_PAGE, page})) 
	)
export const getTotalVisitsWithFilter = (token:string, filter:object) => 
	directusClient.request( 
		withToken(token, aggregate('visits', { aggregate: { count: '*' }, query: { filter: filter } })) 
	)

export const getAVisit = (token:string, id:string) => directusClient.request( withToken(token, readItem('visits', id, { fields: ['*.*.*'] })));
export const updateVisit = (token:string, id:string, data:object) => directusClient.request( withToken(token, updateItem('visits', id, data)));
export const deleteAVisit = (token:string, id:string) => directusClient.request( withToken(token, deleteItem('visits', id)));

export const getVisitByCount = (token:string, filter:object, groupBy:string) => 
	directusClient.request( withToken(token, aggregate('visits', { aggregate: { count: '*' }, groupBy: [groupBy], query: { filter: filter, limit: 5, sort: ['-count'] } }  )) )