'use server'

import prisma from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.findFirst({
            where: {
                userId: userId
            }
        }).then(deletedAddress => {
            if (!deletedAddress) {
                throw new Error('No se encontró la dirección')
            }
            return prisma.userAddress.delete({
                where: {
                    id: deletedAddress.id
                }
            })
        })
        return {
            ok: true,
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: 'No se pudo guardar la dirección'
        }
    }
}