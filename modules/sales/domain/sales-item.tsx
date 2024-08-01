import { MedicalRecordItem } from "@/modules/medical-records/domain/medical-record";
import { Item, defaultItem, itemMapper } from "@/modules/items/domain/item";

export interface SalesItem {
    id: string,
    item: Item,
    price: number,
    quantity: number,
    type: string,
    total: number,
}

export const defaultSalesItem:SalesItem = {
  id: "",
  item: defaultItem,
  price: 0,
  quantity: 0,
  type: "",
  total: 0,
}

export const salesItemMapper = (res:Record<string,any>) => {
  let salesItem = defaultSalesItem;
  salesItem = { 
    id: res.id, 
    item: res.item? itemMapper(res.item):defaultItem,
    price: res.price,
    quantity: res.quantity,
    type: res.type,
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

export type SalesItemCreator = Omit<SalesItem, 'id'|'item'> & { item:string, organization: number };
export const salesItemCreatorMapper = (mrItem:MedicalRecordItem, orgID:number) => {
  
  let price = mrItem.items_id.price;
  let total = mrItem.items_id.price * mrItem.quantity;
  let quantity = mrItem.quantity;

  let orderItemCreator:SalesItemCreator = {
    price: price,
    quantity: quantity,
    total: total,
    item: mrItem.items_id.id,
    type: mrItem.type,
    organization: orgID,
  }
  return orderItemCreator;
}

export const salesItemPatcherMapper = (orderItem:SalesItem, orgID:number) => {
  
  let price = orderItem.item.price;
  let quantity = orderItem.quantity;
  let total = price * quantity;

  let orderItemCreator:SalesItemCreator = {
    price: price,
    quantity: quantity,
    total: total,
    item: orderItem.item.id,
    type: orderItem.type,
    organization: orgID,
  }
  return orderItemCreator;
}