'use client'

import { titleFont } from '@/app/config/fonts'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { navCategories } from '@/consts/navbarRoutes'
import { useUiStore } from '@/store'

export const TopMenu = () => {

    const openSideMenu = useUiStore((state) => state.openSideMenu)
    return (
        <nav className='flex px-5 justify-between items-center w-full'>

            <div>
                <Link href='/'>
                    <span className={`${titleFont.className} antialiased font-bold`}>eCommerce Shop</span>
                </Link>
            </div>

            <div className='hidden sm:block'>
                {navCategories.map((category) => (
                    <Link className='p-2 rounded-md transition-all hover:bg-gray-100 capitalize' href={`/category/${category.value}`} key={category.value}>
                        {category.name}
                    </Link>))}
            </div>

            <div className='flex gap-x-4 items-center'>
                <Link className='mx-2' href='/search'>
                    <IoSearchOutline className='size-5' />
                </Link>

                <Link className='mx-2' href='/cart'>
                    <div className='relative'>
                        <span className='absolute text-xs px-1 font-bold -top-2 -right-2 rounded-full bg-blue-700 text-white'>3</span>
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