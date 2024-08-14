import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { SalesItem } from "./sales-item";
import moment from "moment";

export function visitFilter(id:string):object {
    return { visit: { _eq: id } };
}

export function statusFilter(status:string):object {
    return { status: { _eq: status } };
}

export function orderStatusFilter(status:string):object {
    return { order: { status: { _eq: status } } };
}

export function itemTypeFilter(type:string):object {
    return { type: { _eq: type } };
}

export function monthFilter(month:number):object {
    return { "month(date_updated)": { _eq: month } }
}

export function yearFilter(year:number):object {
    return { "year(date_updated)": { _eq: year } }
}

export function dateRangeFilter(from:Date, to:Date) {
    return { "date_created": { _between: [moment(from).format("YYYY-MM-DD"), moment(to).format("YYYY-MM-DD")]  } }
}

export function orderItemDisplayName(orderItem:SalesItem):string {
    if (orderItem.type !== ITEM_TYPE.treatment) {
        return orderItem.item.name + " (" + orderItem.quantity + ")";
    }
    return orderItem.item.name;
}