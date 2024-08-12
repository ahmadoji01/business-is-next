export interface Document {
    id: string,
    filename_download: string,
}

export interface Transaction {
    id: string,
    transaction_date: Date,
    description: string,
    total: number,
    document: Document|null,
}

export const defaultTransaction = {
    id: "",
    transaction_date: new Date,
    description: "",
    total: 0,
    document: null,
}

export function transactionMapper(res:Record<string,any>) {
    let transaction = {
        id: res.id,
        transaction_date: res.transaction_date,
        description: res.description,
        total: res.total,
        document: res.document? res.document:null,
    }
    return transaction;
}

export type TransactionCreator = Transaction & { organization:string };
export function createTransactionMapper(trans:Transaction, date:Date, orgID:string) {
    let transaction = {
        id: trans.id,
        transaction_date: date,
        description: trans.description,
        total: trans.total,
        document: trans.document? trans.document:null,
        organization: orgID,
    }
    return transaction;
}