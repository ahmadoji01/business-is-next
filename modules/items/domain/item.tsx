import { Category, categoryMapper } from "@/modules/categories/domain/category";
import { defaultCategory } from "@/modules/categories/domain/category";

export interface Item {
    id: string,
    sku: string,
    name: string,
    stock: number,
    category: Category,
    price: number,
    unit: string,
    type: string,
}

export const defaultItem: Item = {
    id: "",
    sku: "",
    name: "",
    stock: 0,
    category: defaultCategory,
    price: 0,
    unit: "",
    type: "",
}

export function itemMapper(res:Record<string,any>) {
    let item = defaultItem;
    item = { 
        id: res.id,
        name: res.name, 
        sku: res.sku? res.sku : "",
        price: res.price,
        stock: res.stock,
        category: res.category? categoryMapper(res.category) : defaultCategory,
        unit: res.unit? res.unit : "",
        type: res.type? res.type : "",
    }
    return item;
}

export type ItemCreator = Omit<Item, 'id'|'category'> & { category:string, organization: number };
export function itemCreatorMapper(item:Item, catID:string, orgID:number) {

    let itemCreator: ItemCreator = { 
        name: item.name, 
        sku: item.sku,
        price: item.price,
        stock: item.stock,
        unit: item.unit? item.unit : "",
        type: item.type? item.type : "",
        category: catID,
        organization: orgID,
    }
    return itemCreator;
}

export type ItemPatcher = Omit<Item, 'id'|'category'> & { category:string };
export function itemPatcherMapper(item:Item) {
    let itemPatcher:ItemPatcher = {
        name: item.name, 
        sku: item.sku,
        price: item.price,
        stock: item.stock,
        unit: item.unit? item.unit : "",
        type: item.type? item.type : "",
        category: item.category.id,
    }
    return itemPatcher;
}