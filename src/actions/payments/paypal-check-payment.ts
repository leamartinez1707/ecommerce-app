'use server'

import { PaypalOrderStatusResponse } from "@/interfaces/paypal-interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {

    const authToken = await getPaypalBearToken();
    console.log({ authToken });
    if (!authToken) {
        return {
            ok: false,
            message: 'No auth token'
        }
    }
    const resp = await verifyPaypalPayment(transactionId, authToken);
    console.log({ resp });
    if (!resp) {
        return {
            ok: false,
            message: 'No response from Paypal'
        }
    }
    const { purchase_units, status } = resp;

    const { invoice_id: orderId } = purchase_units[0]
    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'Payment not completed'
        }
    }
    try {
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })

        revalidatePath(`/orders/${orderId}`);
        return {
            ok: true,
            message: 'Payment completed'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: '500 - Error processing payment'
        }
    }

}


const getPaypalBearToken = async (): Promise<string | null> => {
    const url = process.env.PAYPAL_OAUTH_URL ?? "";

    const base64token = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`, 'utf-8').toString('base64');


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + base64token);

    const urlEncoded = new URLSearchParams();
    urlEncoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlEncoded,
    };

    try {

        const result = await fetch(url, {
            ...requestOptions,
            cache: 'no-store'
        }).then(res => res.json());

        console.log(result);
        return result.access_token;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PaypalOrderStatusResponse | null> => {

    const url = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(url, {
            ...requestOptions,
            cache: 'no-store'
        }).then(res => res.json());
        console.log('Paypal transaction info', response);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}