'use client'

import { useCartStore } from "@/store/cart/cart-store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore((state) => state.cart)

    useEffect(() => {
        setLoaded(true)
    }, [])
    if (!loaded) return 'Cargando carrito...'
    if (loaded && productsInCart.length === 0) return <span className="font-semibold">No hay productos en el carrito</span>
    return (
        <>
            {productsInCart.map((product) => (
                <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                    <Image
                        src={`/products/${product.image}`}
                        alt={product.title}
                        width={100}
                        style={{
                            width: '100px',
                            height: '100px'
                        }}
                        height={100}
                        className="mr-5 rounded"
                    />

                    <div>
                        <span>
                            <p>{product.size} - {product.title} ({product.quantity})</p>
                        </span>
                        <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProductsInCart