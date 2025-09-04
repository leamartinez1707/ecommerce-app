import { CartProduct } from "@/interfaces/product.interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    cleanCart: () => void;
}


export const useCartStore = create<State>()(
    devtools(
        persist(
            (set, get) => ({
                cart: [],
                getTotalItems: () => {
                    const { cart } = get();
                    return cart.reduce((total, item) => total + item.quantity, 0);
                },
                getSummaryInformation: () => {
                    const { cart } = get();
                    const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0)
                    const tax = subTotal * 0.15
                    const total = subTotal + tax
                    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                    return {
                        subTotal, tax, total, itemsInCart
                    }
                },

                addProductToCart: (product: CartProduct) => {

                    const { cart } = get()
                    const existsInCart = cart.some(items => items.slug === product.slug && items.size === product.size)

                    if (!existsInCart) {
                        set({ cart: [...cart, product] })
                        return;
                    }

                    const updatedCart = cart.map(item => {

                        if (item.id === product.id && item.size === product.size) {
                            return {
                                ...item,
                                quantity: item.quantity + product.quantity
                            }
                        }
                        return item;
                    })

                    set({ cart: updatedCart })
                },
                updateProductQuantity: (product: CartProduct, quantity: number) => {
                    const { cart } = get();
                    const updatedCart = cart.map(item => {
                        if (item.id === product.id && item.size === product.size) {
                            return {
                                ...item,
                                quantity
                            }
                        }
                        return item;
                    })
                    set({ cart: updatedCart })
                },
                removeProductFromCart: (product: CartProduct) => {
                    const { cart } = get();
                    const updatedCart = cart.filter(item => item.id !== product.id || item.size !== product.size)
                    set({ cart: updatedCart })
                },
                cleanCart: () => {
                    set({ cart: [] });
                }
            }),
            {
                name: "cart-storage",
            }
        )
    )
)