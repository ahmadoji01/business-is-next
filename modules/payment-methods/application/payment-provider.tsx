import { Dispatch, SetStateAction } from "react"
import CardPayment from "./payment.card"
import CashPayment from "./payment.cash"

interface PaymentProviderProps {
    name: string,
    total: number,
    handleCashChange: Dispatch<SetStateAction<number>>,
}

const PaymentProvider = ({ name, total = 0, handleCashChange }:PaymentProviderProps) => {

    switch (name) {
        case 'cash':
            return <CashPayment total={total} handleChange={handleCashChange} />
        case 'card':
            return <CardPayment total={total} />
        default:
            return <CashPayment total={total} handleChange={handleCashChange} />
    }

}

export default PaymentProvider;