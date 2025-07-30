"use client"

import { useCartStore } from "@/store/cart/cart-store"
import { currencyFormat } from "@/utils"
import { useEffect, useState } from "react"
import { useShallow } from 'zustand/react/shallow'

const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false)
    const { subTotal, tax, total, itemsInCart } = useCartStore(useShallow((state) => state.getSummaryInformation()))

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) return 'Calculando costos..'

    return (
        <>
            <span>N° productos</span>
            <span className="text-right">{itemsInCart} artículo/s</span>
            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal) ?? 0}</span>
            <span>Impuestos</span>
            <span className="text-right mb-5">{currencyFormat(tax) ?? 0}</span>
            <span className="font-bold text-2xl">Total</span>
            <span className="text-right">{currencyFormat(total) ?? 0}</span>
        </>
    )
}

export default OrderSummary