'use client';

import { Order, defaultOrder } from '@/modules/orders/domain/order';
import { OrderItem, defaultOrderItem } from '@/modules/orders/domain/order-item';
import { Visit, defaultVisit } from '@/modules/visits/domain/visit';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface DocumentContextType {
    orderDocument: Order,
    ordersDocument: Order[],
    visitDocument: Visit,
    orderItemsDocument: OrderItem[],
    from: string,
    to: string,
    setOrderDocument: Dispatch<SetStateAction<Order>>,
    setOrdersDocument: Dispatch<SetStateAction<Order[]>>,
    setVisitDocument: Dispatch<SetStateAction<Visit>>,
    setOrderItemsDocument: Dispatch<SetStateAction<OrderItem[]>>,
    setFrom: Dispatch<SetStateAction<string>>,
    setTo: Dispatch<SetStateAction<string>>,
}

export const DocumentContext = createContext<DocumentContextType | null>({
    orderDocument: defaultOrder,
    ordersDocument: [],
    visitDocument: defaultVisit,
    orderItemsDocument: [],
    from: "",
    to: "",
    setOrderDocument: () => {},
    setOrdersDocument: () => {},
    setVisitDocument: () => {},
    setOrderItemsDocument: () => {},
    setFrom: () => {},
    setTo: () => {},
});

export const DocumentProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
  const [orderDocument, setOrderDocument] = useState(defaultOrder);
  const [ordersDocument, setOrdersDocument] = useState<Order[]>([]);
  const [visitDocument, setVisitDocument] = useState(defaultVisit);
  const [orderItemsDocument, setOrderItemsDocument] = useState([defaultOrderItem]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <DocumentContext.Provider
      value={{
        orderDocument,
        ordersDocument,
        visitDocument,
        orderItemsDocument,
        from,
        to,
        setOrderDocument,
        setOrdersDocument,
        setVisitDocument,
        setOrderItemsDocument,
        setFrom,
        setTo,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
 
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    
    if (!context) {
        throw new Error('useDocumentContext must be used inside the DocumentProvider');
    }
    
    return context;
};