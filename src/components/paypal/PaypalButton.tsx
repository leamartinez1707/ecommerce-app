'use client'

import { PayPalButtons } from '@paypal/react-paypal-js'
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { setTransactionId, paypalCheckPayment } from '@/actions';

interface Props {
    orderId: string;
    amount: number;
}


export const PaypalButton = ({ orderId, amount }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = (Math.round(amount * 100) / 100);


    if (isPending) return <div className='animate-pulse'>
        <div className="h-11 w-full bg-gray-200 rounded-md" />
        <div className="h-11 mt-3 w-full bg-gray-200 rounded-md" />
    </div>

    // Generar ID de transacción
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    // invoice_id: 'order_id'
                    amount: {
                        currency_code: 'USD',
                        value: roundedAmount.toString(),
                    }
                }
            ],
            intent: 'CAPTURE'
        })

        console.log({ transactionId })
        // TODO: guardar el ID en la order de la base de datos
        // Set transaction ID
        const { ok, message, data: responseData } = await setTransactionId(orderId, transactionId);
        if (!ok) {
            throw new Error('Error setting transaction ID: ' + message)
        }
        console.log(responseData)
        return transactionId;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const details = await actions.order?.capture();
        if (!details) return;

        await paypalCheckPayment(details.id!);
    }
    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )
}

export default PaypalButton