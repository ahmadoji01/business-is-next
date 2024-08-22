import Item, { defaultItem, itemMapper } from "@/modules/items/domain/item";
import { defaultSales, Sales, salesMapper } from "./sales";

export interface SalesItem {
  id: string,
  item: Item,
  quantity: number,
  type: string,
  sales: Sales|null,
  unit_cost: number,
  total: number,
}

export const defaultSalesItem:SalesItem = {
  id: "",
  item: defaultItem,
  quantity: 0,
  type: "",
  sales: null,
  unit_cost: 0,
  total: 0,
}

export const salesItemMapper = (res:Record<string,any>) => {
  let salesItem = defaultSalesItem;
  salesItem = { 
    id: res.id, 
    item: res.item? itemMapper(res.item):defaultItem,
    quantity: res.quantity,
    type: res.type,
    sales: res.sales? salesMapper(res.sales):defaultSales,
    unit_cost: res.unit_cost,
    total: res.total,
  }
  return salesItem;
}

export const salesItemsMapper = (sales_items:Record<string, any>) => {
  let results:SalesItem[] = [];
  sales_items.map( (item:Record<string,any>) => {
    results.push(salesItemMapper(item));
  });
  return results;
}

export type SalesItemCreator = Omit<SalesItem, 'id'|'item'|'sales'> & { item:string, sales:string, organization: string };
export const salesItemCreatorMapper = (salesItem:SalesItem, orgID:string) => {
  
  let unit_cost = salesItem.item.price;
  let quantity = salesItem.quantity;
  let total = unit_cost * quantity;

  let salesItemCreator:SalesItemCreator = {
    quantity: quantity,
    total: total,
    item: salesItem.item.id,
    type: salesItem.type,
    sales: salesItem.sales? salesItem.sales.id:'',
    unit_cost: unit_cost,
    organization: orgID,
  }
  return salesItemCreator;
}

export type SalesItemPatcher = Omit<SalesItem, 'id'|'item'|'sales'> & { item:string, organization: string };
export const salesItemPatcherMapper = (orderItem:SalesItem, orgID:string) => {
  
  let unit_cost = orderItem.item.price;
  let quantity = orderItem.quantity;
  let total = unit_cost * quantity;

  let salesItemPatcher:SalesItemPatcher = {
    unit_cost: unit_cost,
    quantity: quantity,
    total: total,
    item: orderItem.item.id,
    type: orderItem.type,
    organization: orgID,
  }
  return salesItemPatcher;
}