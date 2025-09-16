'use client'

import { ProductImage, QuantitySelector } from "@/components"
import { CartProduct } from "@/interfaces/product.interfaces"
import { useCartStore } from "@/store/cart/cart-store"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore((state) => state.cart)
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
    const removeProductFromCart = useCartStore((state) => state.removeProductFromCart)

    const handleUpdateProductQuantity = (product: CartProduct, quantity: number) => {
        updateProductQuantity(product, quantity)
    }
    useEffect(() => {
        setLoaded(true)
    }, [])
    if (!loaded) return 'Cargando carrito...'
    if (loaded && productsInCart.length === 0) return <span className="font-semibold">No hay productos en el carrito</span>
    return (
        <>
            {productsInCart.map((product) => (
                <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                    <ProductImage
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
                        <Link
                            className="hover:underline cursor-pointer"
                            href={`/products/${product.slug}`}>
                            <p>{product.size} - {product.title}</p>
                        </Link>
                        <p>{product.price}</p>
                        <QuantitySelector quantity={product.quantity} onQuantityChange={quantity => handleUpdateProductQuantity(product, quantity)} />
                        <button
                            onClick={() => removeProductFromCart(product)}
                            className="text-red-500 underline">Eliminar</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProductsInCart