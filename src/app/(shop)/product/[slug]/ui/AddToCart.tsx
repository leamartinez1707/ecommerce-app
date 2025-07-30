'use client'
import { SizeSelector, QuantitySelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces/product.interfaces'
import { useCartStore } from '@/store/cart/cart-store'
import { useState } from 'react'

interface AddToCartProps {
    product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {

    const [size, setSize] = useState<Size | undefined>(undefined)
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)

    const addProductToCart = useCartStore(state => state.addProductToCart)

    const addToCart = () => {
        setPosted(true)
        if (!size) {
            alert('Debe seleccionar una talla')
            return;
        }
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            size: size,
            image: product.images[0],
            quantity: quantity
        }
        addProductToCart(cartProduct)
        setPosted(false)
        setSize(undefined)
        setQuantity(1)
        alert('Producto agregado al carrito')
    }
    return (
        <>
            {posted && !size && (
                <span className='mt-2 text-red-500 fade-in'>Debe seleccionar una talla*</span>
            )}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChange={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

            <button onClick={addToCart} className="btn-primary my-4">
                Agregar al carrito
            </button>
        </>
    )
}
