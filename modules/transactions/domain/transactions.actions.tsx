import { directusClient } from "@/utils/request-handler";
import { Transaction, TransactionCreator } from "./transaction";
import { createItem, createItems, withToken } from "@directus/sdk";

export const createATransaction = (token:string, transaction:TransactionCreator) => 
    directusClient.request( withToken(token, createItem('transactions', transaction)) );

export const createManyTransactions = (token:string, transactions:Transaction[]) => 
    directusClient.request( withToken(token, createItems('transactions', transactions)) );
