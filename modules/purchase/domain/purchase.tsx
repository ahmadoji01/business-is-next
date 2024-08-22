import { Asset, mapAssets } from "@/modules/assets/domain/asset";
import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";

export interface Purchase {
    id: string,
    status: string,
    total: number,
    code: string,
    paid: number,
    transaction: Transaction,
    assets: Asset[],
}

export const defaultPurchase:Purchase = {
    id: "",
    status: "",
    total: 0,
    code: "",
    paid: 0,
    transaction: defaultTransaction,
    assets: [],
}

export function purchaseMapper(res:Record<string,any>) {
    let purchase = {
        id: res.id,
        status: res.status,
        total: parseFloat(res.total),
        code: res.code? res.code:"",
        paid: parseFloat(res.paid),
        transaction: res.transaction? transactionMapper(res.transaction):defaultTransaction,
        assets: res.assets? mapAssets(res.assets):[],
    }
    return purchase;
}