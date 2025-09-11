'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {

    try {

        const session = await auth();
        if (session?.user.role !== 'admin') {
            return {
                ok: false,
                error: 'Not authorized'
            }
        }

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
        return {
            ok: true,
            orders
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: 'Error trying to get orders'
        }
    }

}