export interface Photo {
    id: string,
    filename_download: string,
}

export interface Customer {
    id: string,
    status: string,
    name: string,
    address: string,
    email: string,
    phone: string,
    photo: Photo|null,
}

export const defaultCustomer:Customer = {
    id: '',
    status: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    photo: null,
}

export function customerMapper(res:Record<string,any>) {
    let customer = defaultCustomer;
    
    if (res == null) {
        return customer;
    }
    
    customer = { 
        id: res.id? res.id:"",
        name: res.name? res.name:'', 
        status: res.status? res.status:'',
        address: res.address? res.address:'',
        email: res.email? res.email:'', 
        phone: res.phone? res.phone:'',
        photo: res.photo? res.photo:null,
    }
    return customer;
}

export function mapCustomers(res:Record<string,any>) {
    let custs:Customer[] = [];
    res?.map( (customer:any) => { custs.push(customerMapper(customer)) });
    return custs;
}

export type CustomerPatcher = Omit<Customer, 'id'|'photo'>;

export function customerPatcherMapper(customer:Customer) {
    let result:CustomerPatcher = {
        name: customer.name? customer.name:'', 
        status: customer.status? customer.status:'',
        address: customer.address? customer.address:'',
        email: customer.email? customer.email:'', 
        phone: customer.phone? customer.phone:'',
    }
    return result;
}