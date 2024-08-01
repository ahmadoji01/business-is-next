import { Customer, defaultCustomer } from '@/modules/customers/domain/customer';
import { Organization, defaultOrganization, organizationMapper } from '@/modules/organizations/domain/organization';
import { getOrganization } from '@/modules/organizations/domain/organizations.actions';
import { Sales } from '@/modules/sales/domain/sales';
import { User, defaultUser, userMapper } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { isURLAllowed, redirectURL } from '@/modules/users/domain/users.specifications';
import { directusClient, websocketClient } from '@/utils/request-handler';
import { WebSocketClient } from '@directus/sdk';
import { useRouter, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

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