'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void
}
export const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {

    const handleQuantityChange = (value: number) => {
        if (quantity + value < 1) return;
        if (quantity + value > 5) return;
        onQuantityChange(quantity + value);
    }
    return (
        <div className="flex">
            <button
                onClick={() => handleQuantityChange(-1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded-md">
                {quantity}
            </span>
            <button
                onClick={() => handleQuantityChange(+1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
