'use client';

import { Customer } from '@/modules/customers/domain/customer';
import { defaultSales, Sales, SalesCreator, salesCreatorMapper } from '@/modules/sales/domain/sales';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user.provider';
import toast from 'react-hot-toast';
import Item from '@/modules/items/domain/item';
import { SalesItem } from '@/modules/sales/domain/sales-item';
import { createSales } from '@/modules/sales/domain/sales.actions';
import { translate } from '@/lib/utils';
import { useLanguageContext } from './language.provider';
import { Asset } from '@/modules/assets/domain/assets';
import { defaultPurchase, Purchase } from '@/modules/purchase/domain/purchase';

interface AssetsContextType {
    selectedCustomers: Customer[],
    items: Item[],
    selectedSales: Sales[],
    filter: object,
    assets: Asset[],
    purchase: Purchase,
    setAssets: Dispatch<SetStateAction<Asset[]>>,
    setPurchase: Dispatch<SetStateAction<Purchase>>,
    setFilter: Dispatch<SetStateAction<object>>,
    setSelectedCustomers: Dispatch<SetStateAction<Customer[]>>,
    setItems: Dispatch<SetStateAction<Item[]>>,
    setSelectedSales: Dispatch<SetStateAction<Sales[]>>,
    recalculateTotal: () => void, 
}

export const AssetsContext = createContext<AssetsContextType | null>({
    selectedCustomers: [],
    items: [],
    selectedSales: [],
    filter: {},
    assets: [],
    purchase: defaultPurchase,
    setAssets: () => {},
    setPurchase: () => {},
    setFilter: () => {},
    setSelectedCustomers: () => {},
    setItems: () => {},
    setSelectedSales: () => {},
    recalculateTotal: () => {},
});
 
export const AssetsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [items, setItems] = useState<Item[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [purchase, setPurchase] = useState<Purchase>(defaultPurchase);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [selectedSales, setSelectedSales] = useState<Sales[]>([]);
    const [filter, setFilter] = useState<object>({});

    const recalculateTotal = () => {
        let total = 0;
        assets?.map( asset => { total += asset.total });
        
        let newPurchase = {...purchase};
        newPurchase.total = total;
        setPurchase(newPurchase);
    }

    return (
        <AssetsContext.Provider value={{ 
            selectedSales, 
            setSelectedSales,
            recalculateTotal, 
            items, 
            setItems, 
            selectedCustomers, 
            setSelectedCustomers, 
            filter, 
            setFilter,
            assets, 
            setAssets,
            purchase,
            setPurchase }}>
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