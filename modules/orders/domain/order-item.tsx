import { MedicalRecordItem, MedicineDoses } from "@/modules/medical-records/domain/medical-record";
import { Item, defaultItem, itemMapper } from "@/modules/items/domain/item";

export interface OrderItem {
    id: string,
    item: Item,
    name: string,
    description: string,
    price: number,
    quantity: number,
    type: string,
    total: number,
}

export const defaultOrderItem:OrderItem = {
  id: "",
  item: defaultItem,
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  type: "",
  total: 0,
}

export const orderItemMapper = (res:Record<string,any>) => {
  let orderItem = defaultOrderItem;
  orderItem = { 
    id: res.id, 
    item: res.item? itemMapper(res.item):defaultItem,
    name: res.name,
    description: res.description,
    price: res.price,
    quantity: res.quantity,
    type: res.type,
    total: res.total,
  }
  return orderItem;
}

export const orderItemsMapper = (order_items:Record<string, any>) => {
  let results:OrderItem[] = [];
  order_items.map( (item:Record<string,any>) => {
    results.push(orderItemMapper(item));
  });
  return results;
}

export type OrderItemCreator = Omit<OrderItem, 'id'|'name'|'description'|'item'> & { item:string, organization: number };
export const orderItemCreatorMapper = (mrItem:MedicalRecordItem, orgID:number) => {
  
  let price = mrItem.items_id.price;
  let total = mrItem.items_id.price * mrItem.quantity;
  let quantity = mrItem.quantity;

  let orderItemCreator:OrderItemCreator = {
    price: price,
    quantity: quantity,
    total: total,
    item: mrItem.items_id.id,
    type: mrItem.type,
    organization: orgID,
  }
  return orderItemCreator;
}

export const orderItemPatcherMapper = (orderItem:OrderItem, orgID:number) => {
  
  let price = orderItem.item.price;
  let quantity = orderItem.quantity;
  let total = price * quantity;

  let orderItemCreator:OrderItemCreator = {
    price: price,
    quantity: quantity,
    total: total,
    item: orderItem.item.id,
    type: orderItem.type,
    organization: orgID,
  }
  return orderItemCreator;
}