'use client';

import { Customer, customerMapper, defaultCustomer } from '@/modules/customers/domain/customer';
import { defaultSales, Sales, SalesCreator, salesCreatorMapper } from '@/modules/sales/domain/sales';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user.provider';
import { getAllCustomers } from '@/modules/customers/domain/customers.actions';
import toast from 'react-hot-toast';
import Item from '@/modules/items/domain/item';
import { SalesItem } from '@/modules/sales/domain/sales-item';
import { createSales } from '@/modules/sales/domain/sales.actions';
import { translate } from '@/lib/utils';
import { useLanguageContext } from './language.provider';

interface AssetsContextType {
    selectedCustomers: Customer[],
    items: Item[],
    selectedSales: Sales[],
    filter: object,
    sales: Sales[],
    activeSales: Sales,
    salesItems: SalesItem[],
    setSales: Dispatch<SetStateAction<Sales[]>>,
    setActiveSales: Dispatch<SetStateAction<Sales>>,
    setSalesItems: Dispatch<SetStateAction<SalesItem[]>>,
    setFilter: Dispatch<SetStateAction<object>>,
    setSelectedCustomers: Dispatch<SetStateAction<Customer[]>>,
    setItems: Dispatch<SetStateAction<Item[]>>,
    setSelectedSales: Dispatch<SetStateAction<Sales[]>>,
    recalculateTotal: () => void, 
    submitItems: () => void,
}

export const AssetsContext = createContext<AssetsContextType | null>({
    selectedCustomers: [],
    items: [],
    selectedSales: [],
    filter: {},
    sales: [],
    activeSales: defaultSales,
    salesItems: [],
    setSales: () => {},
    setActiveSales: () => {},
    setSalesItems: () => {},
    setFilter: () => {},
    setSelectedCustomers: () => {},
    setItems: () => {},
    setSelectedSales: () => {},
    recalculateTotal: () => {},
    submitItems: async () => {}, 
});
 
export const AssetsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [items, setItems] = useState<Item[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [selectedSales, setSelectedSales] = useState<Sales[]>([]);
    const [salesItems, setSalesItems] = useState<SalesItem[]>([]);
    const [filter, setFilter] = useState<object>({});
    const [sales, setSales] = useState<Sales[]>([]);
    const [activeSales, setActiveSales] = useState<Sales>(defaultSales);
    const {accessToken, organization} = useUserContext();
    const {trans} = useLanguageContext();

    const recalculateTotal = () => {
        let total = 0;
        salesItems?.map( item => { total += item.total });
        
        let newSales = {...activeSales};
        newSales.total = total;
        setActiveSales(newSales);
    }

    const submitItems = async () => {
        let salesList:SalesCreator[] = [];
        selectedCustomers.map( (cust) => {
            let sales = {...activeSales};
            sales.sales_items = salesItems;
            salesList.push(salesCreatorMapper(sales, organization.id));
        })

        try {
            let res = await createSales(accessToken, salesList);
            toast.success("Customer has been billed!");
            window.location.assign("/sales");
        } catch {
            toast.error(translate("something_wrong", trans));
        }
    }

    return (
        <AssetsContext.Provider value={{ 
            selectedSales, 
            setSelectedSales,
            submitItems, 
            recalculateTotal, 
            activeSales, 
            setActiveSales, 
            salesItems, 
            setSalesItems, 
            items, 
            setItems, 
            selectedCustomers, 
            setSelectedCustomers, 
            filter, 
            setFilter, 
            sales, 
            setSales }}>
            {children}
        </AssetsContext.Provider>
    );
};
 
export const useAssetsContext = () => {
    const context = useContext(AssetsContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the UserProvider');
    }
    
    return context;
};