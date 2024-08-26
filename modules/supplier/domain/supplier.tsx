export interface Supplier {
    id: string,
    address: string,
    name: string,
    phone: string,
    email: string,
    status: string,
}

export const defaultSupplier:Supplier = {
    id: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    status: "",
}

export function supplierMapper(res:Record<string,any>) {
    let supplier:Supplier = {
        id: res.id,
        name: res.name,
        address: res.address,
        phone: res.phone,
        email: res.email,
        status: res.status,
    }
    return supplier;
}


export function mapSuppliers(res:Record<string,any>) {
    let suppliers:Supplier[] = [];
    res?.map( (supplier:any) => { suppliers.push(supplierMapper(supplier)) });
    return suppliers;
}

export type SupplierCreator = Omit<Supplier, 'id'> & { organization:string }