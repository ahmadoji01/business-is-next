import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";
import { SalesItem, SalesItemCreator, salesItemsMapper, salesItemPatcherMapper, SalesItemPatcher, salesItemCreatorMapper } from "./sales-item";
import { Customer, customerMapper, defaultCustomer, Photo } from "@/modules/customers/domain/customer";
import { defaultWarehouse, Warehouse, warehouseMapper } from "@/modules/warehouse/domain/warehouse";
import { defaultPurchase, Purchase, purchaseMapper } from "@/modules/purchase/domain/purchase";

export interface Asset {
    id: string,
    description: string,
    code: string,
    type: string,
    quantity: number,
    unit: string,
    unit_cost: number,
    lifetime: Date,
    warehouse: Warehouse|null,
    purchase: Purchase,
    total: number,
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
    warehouse: null,
    purchase: defaultPurchase,
    total: 0,
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
        warehouse: res.warehouse? warehouseMapper(res.warehouse):defaultWarehouse,
        purchase: res.purchase? purchaseMapper(res.purchase):defaultPurchase,
        total: res.total? res.total:0,
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

export type SalesCreator = Omit<Sales, 'id'|'sales_items'|'customer'|'date_created'|'date_updated'|'transaction'> & Organization & { sales_items: SalesItemPatcher[], customer:string|null, transaction:string|null };
export function salesCreatorMapper(sales:Sales, orgID:string, transaction?:string|null) {
    
    let items:SalesItemPatcher[] = [];
    sales.sales_items?.map( (item) => items.push(salesItemPatcherMapper(item, orgID)));
    let salesCreator: SalesCreator = { 
        description: sales.description ? sales.description : '',
        customer: sales.customer ? sales.customer.id : null,
        sales_items: items,
        total: sales.total,
        paid: sales.paid? sales.paid:0,
        status: sales.status,
        transaction: transaction? transaction:null,
        organization: orgID,
    }
    return salesCreator;
}

export type SalesPatcher = Omit<Sales, 'id'|'sales_items'|'customer'|'date_created'|'date_updated'|'transaction'> & Organization & { sales_items: SalesItemPatcher[], customer:string|null };
export function orderPatcherMapper(sales:Sales, orgID:string, transaction?:string|null) {

    let items:SalesItemPatcher[] = [];
    sales.sales_items?.map( (item) => items.push(salesItemPatcherMapper(item, orgID)));

    let salesPatcher: SalesPatcher = { 
        description: sales.description ? sales.description : '',
        customer: sales.customer ? sales.customer.id : null,
        sales_items: items,
        total: sales.total,
        paid: sales.paid? sales.paid:0,
        status: sales.status,
        organization: orgID,
    }
    return salesPatcher;
}

export interface MonthlySales {
    date_updated_month: number,
    total: number, 
}

export function monthlySalesMapper(res:Record<string,any>) {
    let result:MonthlySales = {
        date_updated_month: res.date_updated_month? parseInt(res.date_updated_month) : -1,
        total: res.sum?.total? res.sum.total : 0,
    }
    return result;
}

export interface ItemQuantitySold {
    item: string,
    quantity: number,
}

export function itemQuantitySoldMapper(res:Record<string,any>) {
    let result:ItemQuantitySold = {
        item: res.item? res.item : "",
        quantity: res.sum?.quantity? res.sum.quantity : 0,
    }
    return result;
}