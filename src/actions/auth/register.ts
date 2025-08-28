'use server'

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10)
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return {
            ok: true,
            user: user
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al registrar usuario'
        }
    }
}