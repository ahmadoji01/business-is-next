import { createItems, withToken } from "@directus/sdk";
import { LedgerCreator } from "./ledger-entry";
import { directusClient } from "@/utils/request-handler";

export const createManyLedgerEntries = (token:string, entries:LedgerCreator[]) => 
    directusClient.request( withToken(token, createItems('ledger_entries', entries)) );