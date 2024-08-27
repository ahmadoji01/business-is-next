import { Asset, AssetCreator, assetCreatorMapper, mapAssets } from "@/modules/assets/domain/assets";
import { ItemCreator, itemCreatorMapper } from "@/modules/items/domain/item";
import { defaultSupplier, Supplier, SupplierCreator, supplierMapper } from "@/modules/supplier/domain/supplier";
import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";

export interface Purchase {
    id: string,
    status: string,
    total: number,
    code: string,
    paid: number,
    transaction: Transaction,
    assets: Asset[],
    supplier: Supplier,
}

export const defaultPurchase:Purchase = {
    id: "",
    status: "",
    total: 0,
    code: "",
    paid: 0,
    transaction: defaultTransaction,
    assets: [],
    supplier: defaultSupplier,
}

export function purchaseMapper(res:Record<string,any>) {
    let purchase:Purchase = {
        id: res.id,
        status: res.status,
        total: parseFloat(res.total),
        code: res.code? res.code:"",
        paid: parseFloat(res.paid),
        transaction: res.transaction? transactionMapper(res.transaction):defaultTransaction,
        assets: res.assets? mapAssets(res.assets):[],
        supplier: res.supplier? supplierMapper(res.supplier):defaultSupplier, 
    }
    return purchase;
}

export type PurchaseCreator = Omit<Purchase, 'id'|'assets'|'transaction'|'supplier'> & { assets:AssetCreator[], organization:string, transaction:string|null, supplier:SupplierCreator|string };
export function purchaseCreatorMapper(purchase:Purchase, orgID:string, transaction?:string|null, supplier?:SupplierCreator|string) {
    
    let assets:AssetCreator[] = [];
    purchase.assets?.map( (asset) => {
        let item:ItemCreator|string = "";

        if (asset.item?.id === "") {
            asset.item.price = asset.unit_cost;
            item = itemCreatorMapper(asset.item, "", orgID);
        }
        else
            item = asset.item.id;
        
        assets.push(assetCreatorMapper(asset, orgID, item));
    });
    let result:PurchaseCreator = {
        status: purchase.status,
        total: purchase.total,
        code: purchase.code,
        paid: purchase.paid,
        transaction: transaction? transaction:"",
        assets: assets,
        supplier: supplier? supplier:"",
        organization: orgID,
    };
    return result;
}