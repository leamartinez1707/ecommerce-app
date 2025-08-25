'use client'

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { authenticate } from "@/actions"
import Link from "next/link"
import clsx from "clsx"

const LoginForm = () => {

    const [state, dispatch] = useActionState(authenticate, undefined)

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace('/');
        }
    }, [state])

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email"
            />


            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password"
            />

            <div className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "CredentialsSignin" && (
                    <>
                        <p className="text-sm text-red-500">Credenciales inválidas</p>
                    </>
                )}
            </div>

            <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}

export default LoginForm

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            className={clsx(
                "btn-primary",
                {
                    "opacity-50": pending,
                }
            )}
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? "Cargando..." : "Ingresar"}
        </button>
    )
}