'use client';

import { Customer, customerMapper, defaultCustomer } from '@/modules/customers/domain/customer';
import { Sales } from '@/modules/sales/domain/sales';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user.provider';
import { getAllCustomers } from '@/modules/customers/domain/customers.actions';
import toast from 'react-hot-toast';

interface SalesContextType {
    customers: Customer[],
    selectedCustomers: Customer[],
    filter: object,
    sales: Sales[],
    setSales: Dispatch<SetStateAction<Sales[]>>,
    setFilter: Dispatch<SetStateAction<object>>,
    setSelectedCustomers: Dispatch<SetStateAction<Customer[]>>,
    setCustomers: Dispatch<SetStateAction<Customer[]>>,  
}

export const SalesContext = createContext<SalesContextType | null>({
    customers: [],
    selectedCustomers: [],
    filter: {},
    sales: [],
    setSales: () => {},
    setFilter: () => {},
    setSelectedCustomers: () => {},
    setCustomers: () => {},
});
 
export const SalesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filter, setFilter] = useState<object>({});
    const [sales, setSales] = useState<Sales[]>([]);

    useEffect(() => {
        console.log(selectedCustomers);
    }, [selectedCustomers]);

    return (
        <SalesContext.Provider value={{ customers, setCustomers, selectedCustomers, setSelectedCustomers, filter, setFilter, sales, setSales }}>
            {children}
        </SalesContext.Provider>
    );
};
 
export const useSalesContext = () => {
    const context = useContext(SalesContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the UserProvider');
    }
    
    return context;
};