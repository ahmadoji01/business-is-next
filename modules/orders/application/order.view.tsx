'use client';

import { Order } from "../domain/order";
import { orderItemDisplayName } from "../domain/order.specifications";
import Currency from "@/components/Currency";
import { useTranslations } from "next-intl";

interface OrderViewProps {
    order: Order,
}

const OrderView = ({ order }:OrderViewProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('diagnosis') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('name') }
                                </label>
                                <div className="relative bg-white dark:bg-boxdark" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white">{order.patient?.name}</p>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('items') }
                                </label>
                                <div className="relative bg-white dark:bg-boxdark" style={{zIndex: 999999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white">
                                        <ul>
                                            { order.order_items?.map( (item, key) => (
                                                <li className="list-outside" style={ { listStyle: "disc" } } key={key}>
                                                    { orderItemDisplayName(item) }
                                                </li>
                                            )) }
                                        </ul>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('total') }
                                </label>
                                <div className="relative z-20 bg-white dark:bg-boxdark" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white"> 
                                        { <Currency value={order.total} /> }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderView;