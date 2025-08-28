'use client'

import { useState } from 'react';
import { registerUser } from '@/actions';
import { login } from '@/actions/auth/login-action';
import clsx from 'clsx';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'

interface FormInputs {
    name: string;
    password: string;
    email: string;
}

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('');
        const { name, email, password } = data;
        const res = await registerUser(name, email, password);
        if (!res.ok) {
            setErrorMessage(res.message!);
            alert('Error al registrar usuario');
        }
        await login(email.toLowerCase(), password);
        router.push('/profile');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {errors.name?.type === 'required' && <span className="text-red-500">El nombre es requerido</span>}
            <label htmlFor="fullName">Nombre completo</label>
            <input
                autoFocus
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", { "border-red-500": errors.name })}
                type="text" {...register("name", { required: true })} />
            {errors.email?.type === 'required' && <span className="text-red-500">El email es requerido</span>}
            <label htmlFor="email">Email</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", { "border-red-500": errors.email })}
                type="email" {...register("email", { required: true })} />

            {errors.password?.type === 'required' && <span className="text-red-500">La contraseña es requerida</span>}
            <label htmlFor="password">Contraseña</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", { "border-red-500": errors.password })}
                type="password" {...register("password", { required: true, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una letra y un número" } })} />

            <button

                className="btn-primary">
                Registrarse
            </button>

            <span className='text-red-500'>{errorMessage}</span>
            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}

export default RegisterForm