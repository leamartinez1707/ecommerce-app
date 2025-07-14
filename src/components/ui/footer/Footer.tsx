import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link
                href={'/'}
            >
                <span>Ecommerce </span>
                <span>Shop</span>
                <span> &copy; {new Date().getFullYear()}</span>
            </Link>

        </div>
    )
}
