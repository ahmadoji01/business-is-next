import { Category, categoryMapper } from "@/modules/categories/domain/category";
import { defaultCategory } from "@/modules/categories/domain/category";

export interface Photo {
    id: string,
    filename_download: string,
}

export default interface Item {
    id: string,
    sku: string,
    name: string,
    stock: number,
    category: Category,
    price: number,
    unit: string,
    type: string,
    photo: Photo|null,
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
    photo: null,
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
        photo: res.photo? res.photo : null,
    }
    return item;
}

export function mapItems(res:Record<string,any>) {
    let items:Item[] = [];
    res?.map( (item:any) => { items.push(itemMapper(item)) });
    return items;
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
        photo: item.photo? item.photo : null,
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
        photo: item.photo? item.photo : null,
        category: item.category.id,
    }
    return itemPatcher;
}