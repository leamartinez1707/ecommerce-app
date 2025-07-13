'use client'
import { Product } from "@/interfaces/product.interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductGridItemProps {
    product: Product
}
export const ProductGridItem = ({ product }: ProductGridItemProps) => {
    const [displayImage, setDisplayImage] = useState<string>(product.images[0])
    return (
        <div className="rounded-md overflow-hidden fade-in flex flex-col mx-auto">
            <Link className="hover:scale-105 transform-content duration-200 transition-transform" href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    width={500}
                    height={500}
                    alt={product.title}
                    className="object-cover rounded-t-md"
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                >
                </Image>
            </Link>
            <div className="p-4 flex flex-col">
                <Link className="hover:text-blue-800 transition-colors duration-150" href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <span className="font-bold">${product.price}</span>
            </div>
        </div>

    )
}

export default ProductGridItem