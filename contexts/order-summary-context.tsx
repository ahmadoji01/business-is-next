'use client';

import AlertModal from '@/components/Modal/AlertModal';
import { ALERT_MESSAGE, ALERT_STATUS } from '@/constants/alert';
import { Order, defaultOrder, orderMapper, orderPatcherMapper } from '@/modules/orders/domain/order';
import { getAllOrdersWithFilter, getAnOrder, getOrdersWithFilter, updateOrder } from '@/modules/orders/domain/order.actions';
import { PaymentMethod, defaultPaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { statusFilter } from '@/modules/orders/domain/order.specifications';
import { ORDER_ITEM_TYPE, ORDER_STATUS } from '@/modules/orders/domain/order.constants';
import { OrderItem, defaultOrderItem } from '@/modules/orders/domain/order-item';
import { useAlertContext } from './alert-context';
import { getADoctorOrg } from '@/modules/doctors/domain/doctors.actions';
import { defaultDoctorOrganization, doctorOrgMapper } from '@/modules/doctors/domain/doctor';
import { subsOutputMapper } from '@/modules/websockets/domain/websocket';
import { WS_EVENT_TYPE } from '@/modules/websockets/domain/websocket.constants';
import { Item } from '@/modules/items/domain/item';
import { updateAnItem } from '@/modules/items/domain/items.actions';
import { useTranslations } from 'next-intl';
 
interface OrderSummaryContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    selectedPayment: PaymentMethod|undefined,
    orders: Order[],
    selectedOrder: Order|undefined,
    selectedItem: OrderItem,
    total: number,
    cashReceived: number,
    examFee: number,
    orderLoaded: boolean,
    setTotal: Dispatch<SetStateAction<number>>,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
    setSelectedPayment: Dispatch<SetStateAction<PaymentMethod|undefined>>,
    setOrders: Dispatch<SetStateAction<Order[]>>,
    setSelectedOrder: Dispatch<SetStateAction<Order|undefined>>,
    setSelectedItem: Dispatch<SetStateAction<OrderItem>>,
    setCashReceived: Dispatch<SetStateAction<number>>,
    setExamFee: Dispatch<SetStateAction<number>>,
    confirmPayment: () => void,
    loadAnOrder: (order:Order) => void,
}

export const OrderSummaryContext = createContext<OrderSummaryContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    selectedPayment: defaultPaymentMethod,
    orders: [],
    selectedOrder: defaultOrder,
    selectedItem: defaultOrderItem,
    total: 0,
    cashReceived: 0,
    examFee: 0,
    orderLoaded: true,
    setTotal: () => {},
    handleModal: () => {},
    setSelectedPayment: () => {},
    setOrders: () => {},
    setSelectedOrder: () => {},
    setSelectedItem: () => {},
    setCashReceived: () => {},
    setExamFee: () => {},
    confirmPayment: () => {},
    loadAnOrder: () => {},
});
 
export const OrderSummaryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [itemModalOpen, setItemModalOpen] = useState<boolean>(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const [selectedMedicines, setSelectedMedicines] = useState<Item[]>([]);
    const [medsQtyOrdered, setMedsQtyOrdered] = useState<number[]>([]);
    const [selectedItem, setSelectedItem] = useState<OrderItem>(defaultOrderItem);
    const [total, setTotal] = useState<number>(1);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [examFee, setExamFee] = useState<number>(0);
    const [orderLoaded, setOrderLoaded] = useState(true);
    const [notifSound, setNotifSound] = useState<HTMLAudioElement>(new Audio(''));
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [orderID, setOrderID] = useState("");

    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
    const [alertStatus, setAlertStatus] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertAction, setAlertAction] = useState<string>("");

    const {accessToken, organization, user, wsClient} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const t = useTranslations();
    const fields = ['id', 'patient.name']; 

    const playNotificationSound = () => {
        notifSound.play();
    }

    const loadAnOrder = async (order:Order) => {
        setOrderLoaded(false);
        await getAnOrder(accessToken, order.id)
            .then( (res) => {
                let ord = defaultOrder;
                ord = orderMapper(res);
                setSelectedOrder(ord);
            })
            .catch( () => openSnackbarNotification(ALERT_MESSAGE.server_error, "error") )
        setOrderLoaded(true);
    }

    useEffect( () => {
        setNotifSound(new Audio('/sounds/notification-sound.mp3'));
        if (user.id === '')
            return;

        getAllOrdersWithFilter(accessToken, statusFilter(ORDER_STATUS.waiting_to_pay), fields)
            .then( (res) => {
                let ords:Order[] = [];
                res?.map( (order) => { ords.push(orderMapper(order)) });
                setOrders(ords);
                setOrdersLoaded(true);
            })
    }, [user]);

    useEffect( () => {
        if (typeof(selectedOrder) === 'undefined')
            return;

        if (orderID === selectedOrder.id)
            return;
        
        setOrderID(selectedOrder.id);
        getADoctorOrg(accessToken, { _and: [ { doctors_id: { _eq: selectedOrder?.visit.doctor.id } }, { organizations_id: { _eq: organization.id } } ] })
        .then( res => {
            let doctorOrg = defaultDoctorOrganization;
            if (res.length > 0)
                doctorOrg = doctorOrgMapper(res[0]);
            setExamFee(doctorOrg.examination_fee);
        });

        if (selectedOrder?.visit.id === "")
            setExamFee(0);

        let meds:Item[] = [];
        let medsQty:number[] = [];
        selectedOrder?.order_items.map( (item) => {
            if (item.item.type === ORDER_ITEM_TYPE.medicine) {
                meds.push(item.item);
                medsQty.push(item.quantity);
            }
            setSelectedMedicines(meds);
            setMedsQtyOrdered(medsQty);
        });
    }, [selectedOrder]);

    const confirmPayment = () => {
        if (typeof(selectedPayment) === 'undefined') {
            openSnackbarNotification(t("alert_msg.no_payment_selected"), "error");
            setOpenSnackbar(true);
            return;
        }
        if (selectedPayment.name.toLowerCase() === 'cash' && (cashReceived == 0 || cashReceived < total)) {
            openSnackbarNotification(t("alert_msg.amount_not_enough"), "error");
            setOpenSnackbar(true);
            return;
        }

        if (typeof(selectedOrder) === 'undefined') {
            openSnackbarNotification(t("alert_msg.no_order_selected"), "error");
            return;
        }

        let isError = false;
        
        let orderPatcher = orderPatcherMapper(selectedOrder, organization.id)
        orderPatcher.status = ORDER_STATUS.paid;
        orderPatcher.total = total;
        updateOrder(accessToken, selectedOrder.id, orderPatcher).catch( err => {
            isError = true;
            return;
        });

        if (isError) {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }
        
        selectedMedicines.map( (med, key) => {
            let data = { stock: med.stock - medsQtyOrdered[key] };
            updateAnItem(accessToken, med.id, data)
                .catch( () => { isError = true; return; })
        });

        if (isError) {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
            return;
        }

        setAlertStatus(ALERT_STATUS.success);
        setAlertMessage(t("alert_msg.payment_received"));
        setAlertAction("refresh");
        setOpenAlertModal(true);
        return;
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };

    const handleModal = (deleteModal:boolean, itemModal:boolean, checkoutModal:boolean) => {
        if (deleteModal) {
            setDeleteModalOpen(true);
            setItemModalOpen(false);
            setCheckoutModalOpen(false);
            return;
        }
        if (itemModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(true);
            setCheckoutModalOpen(false);
            return;
        }
        if (checkoutModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(false);
            setCheckoutModalOpen(true);
            return;
        }
        setDeleteModalOpen(false);
        setItemModalOpen(false);
        setCheckoutModalOpen(false);
        return;
    }

    async function subsToOrder() {
        const { subscription } = await wsClient.subscribe('orders', {
            event: 'update',
            query: { fields: ['id', 'status', 'patient.id','patient.name'] },
        });
    
        for await (const item of subscription) {
            let output = subsOutputMapper(item);console.log(item);
            if (output.event === WS_EVENT_TYPE.update && output.data.length > 0) {
                let order = orderMapper(output.data[0]);
                if (order.status === ORDER_STATUS.waiting_to_pay && !orders.some( ord => ord.id === order.id )) {
                    playNotificationSound();
                    let newOrders = [...orders, order];
                    setOrders(newOrders);
                }
            }
        }
    }

    useEffect( () => {
        if (!ordersLoaded)
            return;

        if (typeof(wsClient) === "undefined") 
            return;
        
        subsToOrder();
    }, [ordersLoaded]);

    return (
        <OrderSummaryContext.Provider value={{ orderLoaded, examFee, deleteModalOpen, itemModalOpen, checkoutModalOpen, total, orders, selectedOrder, selectedItem, selectedPayment, cashReceived, loadAnOrder, setExamFee, handleModal, setCashReceived, setSelectedPayment, setTotal, setOrders, setSelectedOrder, setSelectedItem, confirmPayment }}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 2147483647 }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    { snackbarMsg }
                </Alert>
            </Snackbar>
            <AlertModal message={alertMessage} alertStatus={alertStatus} action={alertAction} open={openAlertModal} setOpen={setOpenAlertModal} />
        </OrderSummaryContext.Provider>
    );
};
 
export const useOrderSummaryContext = () => {
    const context = useContext(OrderSummaryContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the OrderSummaryProvider');
    }
    
    return context;
};