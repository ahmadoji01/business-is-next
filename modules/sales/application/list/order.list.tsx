import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sales } from "../../domain/sales";
import Currency from "@/components/Currency";
import moment from 'moment/min/moment-with-locales';
import { Pagination } from "@mui/material";
import { orderItemDisplayName } from "../../domain/order.specifications";
import { useTranslations } from "next-intl";

interface OrderListTableProps {
  handleModal: (closeModal:boolean, whichModal:boolean) => void,
  orders: Sales[],
  totalPages: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  setActiveOrder: Dispatch<SetStateAction<Sales|undefined>>,
  handleDocument?: (order:Sales) => void,
}

const OrderListTable = ({ orders, setActiveOrder, totalPages, handleModal, handlePageChange, handleDocument }: OrderListTableProps) => {
  
  const t = useTranslations();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("date") }
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              { t("name") }
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("ordered_items") }
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("total") }
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("actions") }
            </h5>
          </div>
        </div>

        {typeof(orders) !== "undefined" && orders.map((order, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === orders.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ moment(order.date_updated).locale('id').format("Do MMMM YYYY") }</p>
            </div>

            <div className="flex items-center justify p-2.5 xl:p-5">
                <p className="text-meta-3">{order.patient?.name}</p>
            </div>

            <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
              <ul className="list-outside text-black dark:text-white" style={{ listStyle: "auto" }}>
                {order.order_items?.map( (orderItem, key) => <li key={key}>{orderItemDisplayName(orderItem)}</li> )}
              </ul>
            </div>

            <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3 dark:text-white">{<Currency value={order.total} />}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                { handleDocument &&
                  <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                    <Link
                      href="/documents/order"
                      onClick={() => { handleDocument(order) }}
                      style={{ background: "blue" }}
                      className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      >
                      <FontAwesomeIcon width={18} height={18} icon={faPrint} style={{ color: 'white' }} />
                    </Link>
                  </motion.li>
                }
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, false); setActiveOrder(order) }}
                    style={{ background: "red" }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faTrash} style={{ color: 'white' }} />
                  </Link>
                </motion.li>
              </ul>
            </div>
          </div>
        ))}
        <div className="py-3">
          <Pagination count={totalPages} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default OrderListTable;
