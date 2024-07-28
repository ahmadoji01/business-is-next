export interface PaymentMethod {
    id: number,
    name: string,
    description: string,
    enabled: boolean,
}

export const defaultPaymentMethod: PaymentMethod = {
    id: 0,
    name: "",
    description: "",
    enabled: false,
}