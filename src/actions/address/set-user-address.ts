'use server'

import { Address } from "@/interfaces/address.interface"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const savedAddress = await createOrReplaceAddress(address, userId)
        return {
            ok: true,
            address: savedAddress
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: 'No se pudo guardar la dirección'
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {

    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        })

        const savedAddress = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            countryId: address.country,
            phone: address.phone,
            firstName: address.firstName,
            lastName: address.lastName
        }
        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: savedAddress
            })
            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId: userId
            },
            data: savedAddress
        })
        return updatedAddress;
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo guardar la dirección')
    }
}