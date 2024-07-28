import Currency from "@/components/Currency";
import appConfig from "@/config";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";

interface CashPaymentProps {
    total: number,
    handleChange: Dispatch<SetStateAction<number>>
}

const CashPayment = ({ total, handleChange }: CashPaymentProps) => {

    const [cashReceived, setCashReceived] = useState<number>(0);
    const t = useTranslations();

    const handleCashChange = (event: React.BaseSyntheticEvent) => {
        let received = 0;
        if (typeof(event.target.valueAsNumber) === 'number' && event.target.value !== '') {
            received = event.target.valueAsNumber;
        }
        setCashReceived(received);
        handleChange(received);
    }
    
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col p-6.5">
                <div>
                    <h4 className="font-extrabold text-black dark:text-white text-xl text-center">Total</h4>
                </div>
                <div className="mb-4">
                    <h4 className="font-extrabold text-black dark:text-white mr-2 text-xl text-center"><Currency value={total} /></h4>
                </div>
                <div className="flex flex-rows mb-4 h-full items-center justify-center">
                    <span className="font-extrabold text-black dark:text-white mr-2">{appConfig.CURRENCY_FORMAT}</span>
                    <input
                        type="number"
                        onChange={event => handleCashChange(event)}
                        placeholder={t("cashier.input_received_cash")}
                        className="w-full text-black dark:text-white rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                </div>
                <div>
                    <h4 className="font-extrabold text-black dark:text-white text-xl">{ t("cashier.change") }:</h4>
                    <h4 className="font-extrabold text-black dark:text-white text-xl"><Currency value={cashReceived-total} /></h4>
                </div>
            </div>
        </div>
    );
}

export default CashPayment;