import { OrderItem } from "../../domain/order-item";
import Currency from "@/components/Currency";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface OrderItemReviewProps {
  orderItems: OrderItem[]|undefined,
  total: number,
  examFee?: number,
}

const OrderItemReview = ({ orderItems, total = 0, examFee = 0 }:OrderItemReviewProps) => {
  const [fee, setFee] = useState(0);

  const t = useTranslations();

  useEffect( () => {
    setFee(examFee);
  }, [examFee])

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("module_app.item_name") }
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("unit_price") }
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("quantity") }
            </h5>
          </div>
          <div className="p-2 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total
            </h5>
          </div>
        </div>
        { fee !== 0 && 
          <div className={`grid grid-cols-3 sm:grid-cols-4 border-b border-stroke dark:border-strokedark`}>
            <div className="flex items-center justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ t('examination_fee') }</p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3"><Currency value={fee? fee : 0} /></p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white"><Currency value={fee? fee : 0} /></p>
            </div>
          </div>
        }
        {typeof(orderItems) !== "undefined" && orderItems.map((orderItem, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === orderItems.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
            >
            <div className="flex items-center justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{orderItem.item.name}</p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3"><Currency value={orderItem.item.price} /></p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3">{orderItem.quantity}</p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white"><Currency value={orderItem.item.price * orderItem.quantity} /></p>
            </div>
          </div>
        ))}
        <h4 className="font-extrabold mt-4 mb-4 text-2xl text-black dark:text-white">Total: <Currency value={total} /></h4>
      </div>
    </div>
  );
};

export default OrderItemReview;