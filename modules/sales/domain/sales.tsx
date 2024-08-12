import { defaultTransaction, Transaction, transactionMapper } from "@/modules/transactions/domain/transaction";
import { SalesItem, SalesItemCreator, salesItemsMapper, salesItemPatcherMapper, SalesItemPatcher, salesItemCreatorMapper } from "./sales-item";
import { SALES_STATUS } from "./sales.constants";
import { Customer, customerMapper, defaultCustomer } from "@/modules/customers/domain/customer";

export interface Sales {
    id: string,
    description: string,
    customer: Customer,
    sales_items: SalesItem[],
    transaction: Transaction,
    total: number,
    status: string,
    date_created: Date,
    date_updated: Date,
}

export const defaultSales: Sales = {
    id: "",
    description: "",
    customer: defaultCustomer,
    sales_items: [],
    total: 0,
    status: SALES_STATUS.inactive,
    transaction: defaultTransaction,
    date_created: new Date,
    date_updated: new Date,
}

export function salesMapper(res:Record<string,any>) {
    let sales = defaultSales;
    sales = { 
        id: res.id? res.id:"",
        description: res.description? res.description:"", 
        customer: res.customer? customerMapper(res.customer):defaultCustomer,
        sales_items: res.sales_items? salesItemsMapper(res.sales_items):[],
        total: res.total? res.total:0,
        status: res.status? res.status:'',
        transaction: res.transaction? transactionMapper(res.transaction):defaultTransaction,
        date_created: res.date_created? res.date_created:new Date,
        date_updated: res.date_updated? res.date_update:new Date,
    }
    return sales;
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