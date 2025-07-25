'use client'

import { useUiStore } from "@/store"
import Link from "next/link"
import { IoCloseOutline, IoLogIn, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { clsx } from 'clsx';

export const Sidebar = () => {

    const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
    const closeSideMenu = useUiStore((state) => state.closeSideMenu)
    return (
        <div>

            {isSideMenuOpen && (

                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-10">
                </div>

            )}

            {isSideMenuOpen && (
                <div
                    onClick={() => closeSideMenu()}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop:blur-sm">
                </div>
            )}

            <nav
                className={
                    clsx("fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        { "translate-x-full": !isSideMenuOpen }
                    )
                }
            >
                <IoCloseOutline
                    onClick={() => closeSideMenu()}
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                />

                <div className="relative mt-14">
                    <IoSearchOutline
                        size={20}
                        className="absolute top-2 left-2"
                    />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoPersonOutline size={30}
                    />
                    <span className="ml-3 text-xl">Perfil</span>
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoTicketOutline size={30}
                    />
                    <span className="ml-3 text-xl">Ordenes</span>
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoLogIn size={30}
                    />
                    <span className="ml-3 text-xl">Ingresar</span>
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoLogOutOutline size={30}
                    />
                    <span className="ml-3 text-xl">Salir</span>
                </Link>

                <div className="w-full h-px bg-gray-200 my-10" />

                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoShirtOutline size={30}
                    />
                    <span className="ml-3 text-xl">Productos</span>
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoTicketOutline size={30}
                    />
                    <span className="ml-3 text-xl">Ordenes</span>
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-200">
                    <IoPeopleOutline size={30}
                    />
                    <span className="ml-3 text-xl">Usuarios</span>
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar