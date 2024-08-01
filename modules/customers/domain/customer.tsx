export interface Customer {
    id: string,
    status: string,
    name: string,
    address: string,
    email: string,
    phone: string,
}

export const defaultCustomer:Customer = {
    id: '',
    status: '',
    name: '',
    address: '',
    email: '',
    phone: '',
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
        email: res.email? res.email:new Date, 
        phone: res.phone? res.phone:'',
    }
    return customer;
}