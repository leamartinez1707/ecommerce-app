'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {

    try {

        const session = await auth()
        if (!session?.user) {
            return {
                ok: false,
                error: 'Usuario no autenticado'
            }
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
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
            error: 'Error al obtener las órdenes del usuario'
        }
    }

}