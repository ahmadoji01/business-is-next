import { createItem, withToken } from "@directus/sdk";
import { PhysicalCheckup, PhysicalCheckupNoID } from "./physical-checkup";
import { directusClient } from "@/utils/request-handler";

export const createAPhysicalCheckup = (token:string, checkup:PhysicalCheckupNoID) => 
	directusClient.request( withToken(token, createItem('physical_checkups', checkup)) )