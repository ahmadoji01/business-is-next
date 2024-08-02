import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler";
import { readItems, withToken } from "@directus/sdk";

export const getAllCustomers = (token:string, page:number, fields?:string[]) =>
    directusClient.request( withToken(token, readItems('customers', { fields: fields? fields:['*.*'], limit: LIMIT_PER_PAGE, page } )) )