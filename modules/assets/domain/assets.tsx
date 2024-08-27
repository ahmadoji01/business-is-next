import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";
import { SalesItem, SalesItemCreator, salesItemsMapper, salesItemPatcherMapper, SalesItemPatcher, salesItemCreatorMapper } from "./sales-item";
import { defaultWarehouse, Warehouse, warehouseMapper } from "@/modules/warehouse/domain/warehouse";
import { defaultPurchase, Purchase, purchaseMapper } from "@/modules/purchase/domain/purchase";
import Item, { defaultItem, ItemCreator, itemMapper } from "@/modules/items/domain/item";
import { Photo } from "@/modules/photos/domain/photo";



export interface Asset {
    id: string,
    description: string,
    code: string,
    type: string,
    item: Item,
    quantity: number,
    unit: string,
    unit_cost: number,
    lifetime: Date,
    warehouse: Warehouse|null,
    purchase: Purchase|null,
    total: number,
    photo: Photo|null,
    date_created: Date,
    date_updated: Date,
}

export const defaultAsset: Asset = {
    id: "",
    description: "",
    code: "",
    type: "",
    quantity: 0,
    unit: "",
    unit_cost: 0,
    lifetime: new Date,
    item: defaultItem,
    warehouse: null,
    purchase: null,
    total: 0,
    photo: null,
    date_created: new Date,
    date_updated: new Date,
}

export function assetMapper(res:Record<string,any>) {
    let asset = defaultAsset;
    asset = { 
        id: res.id? res.id:"",
        description: res.description? res.description:"", 
        code: res.code,
        type: res.type,
        quantity: res.quantity,
        unit: res.unit,
        unit_cost: parseFloat(res.unit_cost),
        lifetime: res.lifetime? res.lifetime:new Date,
        item: res.item? itemMapper(res.item):defaultItem,
        warehouse: res.warehouse? warehouseMapper(res.warehouse):defaultWarehouse,
        purchase: res.purchase? purchaseMapper(res.purchase):defaultPurchase,
        total: res.total? res.total:0,
        photo: res.photo? res.photo:null,
        date_created: res.date_created? res.date_created:new Date,
        date_updated: res.date_updated? res.date_update:new Date,
    }
    return asset;
}

export function mapAssets(res:Record<string,any>) {
    let assets:Asset[] = [];
    res?.map( (asset:any) => {
        let asst = assetMapper(asset);
        assets.push(asst);
    })
    return assets;
}

type Organization = {
    organization: string,
}

export type AssetCreator = Omit<Asset, 'id'|'item'|'warehouse'|'purchase'|'date_created'|'date_updated'> & Organization & { warehouse:string, item:ItemCreator|string };
export function assetCreatorMapper(asset:Asset, orgID:string, itm?:ItemCreator|string, warehouse?:string) {
    
    let result:AssetCreator = {
        description: asset.description,
        code: asset.code,
        type: asset.type,
        quantity: asset.quantity,
        unit: asset.unit,
        unit_cost: asset.unit_cost,
        lifetime: asset.lifetime,
        item: itm? itm:"",
        warehouse: warehouse? warehouse:"",
        total: asset.total,
        photo: asset.photo,
        organization: orgID,
    };
    return result;
}