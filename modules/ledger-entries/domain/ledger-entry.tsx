import { Account, accountMapper, defaultAccount } from "@/modules/accounts/domain/accounts";
import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";

export interface LedgerEntry {
    id: string,
    account: Account,
    transaction: Transaction,
    type: string,
    total: number,
    currency: string,
}

export const defaultLedgerEntry = {
    id: "",
    account: defaultAccount,
    transaction: defaultTransaction,
    type: "",
    total: 0,
    currency: "",
}

export function ledgerMapper(res:Record<string,any>) {
    let ledger:LedgerEntry = {
        id: res.id,
        account: accountMapper(res.account),
        transaction: transactionMapper(res.transaction),
        type: res.type,
        total: res.total,
        currency: res.currency? res.currency:'',
    }
    return ledger;
}

export type LedgerCreator = Omit<LedgerEntry, 'id'|'account'|'transaction'> & { account:string, transaction:string|null, organization:string };
export function ledgerCreatorMapper(ledger:LedgerEntry, transaction:string, orgID:string, currency?:string) {
    let ledgerCreator:LedgerCreator = {
        account: ledger.account.id,
        transaction: transaction,
        type: ledger.type,
        total: ledger.total,
        organization: orgID,
        currency: currency? currency:'', 
    }
    return ledgerCreator;
}