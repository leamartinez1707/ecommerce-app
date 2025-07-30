'use client'

import { titleFont } from '@/app/config/fonts'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { navCategories } from '@/consts/navbarRoutes'
import { useUiStore } from '@/store'
import { useCartStore } from '@/store/cart/cart-store'
import { useEffect, useState } from 'react'

export const TopMenu = () => {
    const [loaded, setLoaded] = useState(false)
    const openSideMenu = useUiStore((state) => state.openSideMenu)
    const totalItemsInCart = useCartStore((state) => state.getTotalItems())

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <nav className='flex px-5 justify-between items-center w-full'>

            <div>
                <Link href='/'>
                    <span className={`${titleFont.className} antialiased font-bold`}>eCommerce Shop</span>
                </Link>
            </div>

            <div className='hidden sm:block'>
                {navCategories.map((category) => (
                    <Link className='p-2 rounded-md transition-all hover:bg-gray-100 capitalize' href={`/gender/${category.value}`} key={category.value}>
                        {category.name}
                    </Link>))}
            </div>

            <div className='flex gap-x-4 items-center'>
                <Link className='mx-2' href='/search'>
                    <IoSearchOutline className='size-5' />
                </Link>

                <Link className='mx-2' href={(totalItemsInCart > 0) && loaded ? '/cart' : '/empty'}>
                    <div className='relative'>
                        {(loaded && totalItemsInCart > 0) && (
                            <span className='absolute text-xs px-1 font-bold -top-2 -right-2 rounded-full fade-in bg-blue-700 text-white'>{totalItemsInCart}</span>
                        )}
                        <IoCartOutline className='size-5' />
                    </div>
                </Link>
                <button
                    onClick={() => openSideMenu()}
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menú
                </button>
            </div>



        </nav>
    )
}

export default TopMenu