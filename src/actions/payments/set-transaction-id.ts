'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
    try {

        const response = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId }
        });
        if (!response) {
            return {
                ok: false,
                message: 'Order not found'
            }
        }
        return {
            ok: true,
            message: 'Transaction ID set successfully',
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error setting transaction ID'
        }
    }
}