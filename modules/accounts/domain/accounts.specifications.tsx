import { EntryAction } from "@/utils/accounting-dictionary";
import { Account, mapAccounts } from "./accounts";
import { getAccountsWithFilter } from "./accounts.actions";

export function accountsByCodes(codes:string[]) {
    let codesFilter:object[] = [];

    codes.map( code => {
        let filter = { code: { _eq: code } };
        codesFilter.push(filter);
    });
    
    return { 
        _or: codesFilter
    }
}

export const accountsRequest = async (token:string, entries:EntryAction[]) => {
    let accounts:Account[] = [];
    let entryCodes:string[] = [];
    let entryTypes:string[] = [];
    entries?.map( entry => {
      entryCodes.push(entry.code);
      entryTypes.push(entry.type);
    });
    let filter = accountsByCodes(entryCodes);

    try {
      let res = await getAccountsWithFilter(token, filter);
      accounts = mapAccounts(res);
    } catch {
      return;
    }
}