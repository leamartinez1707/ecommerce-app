import { titleFont } from "@/app/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link
                href={'/'}
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Ecommerce </span>
                <span>Shop</span>
                <span> &copy; {new Date().getFullYear()}</span>
            </Link>
            <Link href='/'
                className="mx-3"
            >
                Privacidad y Términos
            </Link>
            <Link href='/'
                className="mx-3"
            >
                Nuestras tiendas
            </Link>
        </div>
    )
}
