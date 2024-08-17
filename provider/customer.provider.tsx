'use client';

import { Customer, defaultCustomer } from '@/modules/customers/domain/customer';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user.provider';
import { getAllCustomers } from '@/modules/customers/domain/customers.actions';

interface CustomerContextType {
    customers: Customer[],
    selectedCustomers: Customer[],
    activeCustomer: Customer,
    setActiveCustomer: Dispatch<SetStateAction<Customer>>,
    setSelectedCustomers: Dispatch<SetStateAction<Customer[]>>,
    setCustomers: Dispatch<SetStateAction<Customer[]>>,
}

export const CustomerContext = createContext<CustomerContextType | null>({
    customers: [],
    selectedCustomers: [],
    activeCustomer: defaultCustomer,
    setActiveCustomer: () => {},
    setSelectedCustomers: () => {},
    setCustomers: () => {},
});
 
export const CustomerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [activeCustomer, setActiveCustomer] = useState<Customer>(defaultCustomer);
    const {accessToken, organization} = useUserContext();

    const fetchCustomers = async () => {
        try {
            let res = await getAllCustomers(accessToken, 1, )
        } catch {

        }
    }

    useEffect(() => {
        if (accessToken === "")
            return;

        fetchCustomers();
    }, [])

    return (
        <CustomerContext.Provider value={{ activeCustomer, setActiveCustomer, customers, setCustomers, selectedCustomers, setSelectedCustomers}}>
            {children}
        </CustomerContext.Provider>
    );
};
 
export const useCustomerContext = () => {
    const context = useContext(CustomerContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the UserProvider');
    }
    
    return context;
};