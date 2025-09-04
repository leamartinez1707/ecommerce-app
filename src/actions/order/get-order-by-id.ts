'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

    try {
        const session = await auth();

        if (!session) return {
            ok: false,
            error: 'Debe estar autenticado'
        }

        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })
        if (!order) {
            throw new Error(`Orden ${id} no encontrada`)
        }

        if (session.user.role === 'user') {
            if (session.user.id !== order.userId) {
                throw new Error('No tiene permiso para ver esta orden')
            }
        }
        return {
            ok: true,
            order
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: 'Error al obtener la orden, contacte un administrador.'
        }
    }


}