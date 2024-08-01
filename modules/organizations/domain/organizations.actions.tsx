import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { readItems, updateItem, uploadFiles, withToken } from "@directus/sdk";

export const getOrganization = (token:string, page:number, fields?:string[]) => directusClient.request( withToken(token, readItems('organizations', { fields: fields? fields:['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const updateOrganization = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('organizations', id, data)));
export const uploadClinicLogo = (token:string, data:FormData) => directusClient.request(withToken(token, uploadFiles(data)));
export const updateSubscription = (token:string, orgId:number) => 
    directusClient.request(withToken(token, () => ({
        path: '/extensions/payments/' + orgId,
        method: 'GET',
    })));