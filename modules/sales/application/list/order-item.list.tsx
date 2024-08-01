import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { SalesItem } from "../../domain/sales-item";
import Currency from "@/components/Currency";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { ORDER_ITEM_TYPE } from "../../domain/order.constants";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { useTranslations } from "next-intl";

interface OrderItemListProps {
  orderItems: SalesItem[]|undefined,
  handleQtyChange: (action:string, itemIndex:number, qty:number) => void,
  handleDelete: (item:SalesItem, index:number) => void,
  examFee?: number
}

const OrderItemList = ({ orderItems, handleDelete, handleQtyChange, examFee = 0 }:OrderItemListProps) => {

  const [items, setItems] = useState<SalesItem[]|undefined>(orderItems);
  const [fee, setFee] = useState<number>(0);
  const qtyRef = useRef<HTMLInputElement>(null)
  const [quantity, setQuantity] = useState(0);
  const t = useTranslations();

  useEffect( () => {
    setItems(orderItems);
  }, [orderItems]);

  useEffect( () => {
    setFee(examFee);
  }, [examFee])

  const handleChange = (action:string, itemIndex:number, e: FocusEvent<HTMLInputElement,Element>|null) => {
    let qty = 0;
    
    if (qtyRef.current === null) {
      return;
    }

    qty = parseInt(qtyRef.current.value);

    if (e === null) {
      if (action === "add")
        qty++;
      if (action === "substract")
        qty--;

      qtyRef.current.value = qty.toString();
      setQuantity(qty);
      handleQtyChange(action, itemIndex, qty);
      return;
    }
    
    if (parseInt(e.target.value) <= 0 || e.target.value === "") {
      qty = 1;
      e.target.value = qty.toString();
    } else {
      qty = parseInt(e.target.value);
    }
    setQuantity(qty);
    handleQtyChange(action, itemIndex, qty);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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
          <div className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`}>
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
            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
            </div>
          </div>
        }
        {typeof(items) !== "undefined" && items.map((orderItem, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === items.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ orderItem.item.name } { orderItem.item.type !== ITEM_TYPE.treatment && " (" + orderItem.item.stock.toString() + ")" }</p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3"><Currency value={ orderItem.item.price } /></p>
            </div>
            
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              { orderItem.type !== ORDER_ITEM_TYPE.treatment && 
                <div className="custom-number-input h-10">
                  <div className="flex flex-row h-10 w-full rounded-lg mt-1">
                    <button className="h-full w-10 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin" onClick={() => handleChange('substract', key, null)}>−</span>
                    </button>
                    <input 
                      ref={qtyRef}
                      required
                      value={orderItem.quantity}
                      min="1"
                      type="number" 
                      className="quantity-input text-center w-10 font-semibold bg-transparent" 
                      name="custom-input-number"
                      onBlur={e => { handleChange('input', key, e)} } />
                    <button data-action="increment" className="h-full w-10">
                      <span className="m-auto text-2xl font-thin" onClick={() => handleChange('add', key, null)}>+</span>
                    </button>
                  </div>
                </div>
              }
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white"><Currency value={orderItem.item.price * orderItem.quantity} /></p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={ () => handleDelete(orderItem, key)}
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
      </div>
    </div>
  );
};

export default OrderItemList;