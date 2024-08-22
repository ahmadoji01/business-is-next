export interface Warehouse {
    id: string,
    name: string,
    location: string,
    type: string,
}

export const defaultWarehouse:Warehouse = {
    id: "",
    name: "",
    location: "",
    type: "",
}

export function warehouseMapper(res:Record<string,any>) {
    let warehouse:Warehouse = {
        id: res.id,
        name: res.name,
        location: res.location,
        type: res.type,
    }
    return warehouse;
}