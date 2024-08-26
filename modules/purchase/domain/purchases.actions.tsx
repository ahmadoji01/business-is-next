import { directusClient } from "@/utils/request-handler";
import { createItem, createItems, withToken } from "@directus/sdk";
import { PurchaseCreator } from "./purchase";

export const createAPurchase = (token:string, purchase:PurchaseCreator) => 
    directusClient.request( withToken(token, createItem('purchases', purchase)) );