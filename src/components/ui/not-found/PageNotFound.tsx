import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center text-center p-4'>
            <h2 className='text-9xl font-bold mb-4'>
                Error 404
            </h2>
            <p className='text-xl font-semibold'>UPS! Los sentimos mucho, la página que buscabas no esta disponible..</p>
            <Link href={"/"} className="text-blue-500 hover:underline font-light mt-4">
                Volver al inicio
            </Link>
        </div>
    )
}

export default PageNotFound