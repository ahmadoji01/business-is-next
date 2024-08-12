import { directusClient } from "@/utils/request-handler";
import { Transaction } from "./transaction";
import { createItems, withToken } from "@directus/sdk";

export const createManyTransactions = (token:string, transactions:Transaction[]) => 
    directusClient.request( withToken(token, createItems('transactions', transactions)) );
