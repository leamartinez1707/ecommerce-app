'use client';
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface QuantitySelectorProps {
    quantity: number;
}
export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
    const [count, setCount] = useState(quantity);

    const handleQuantityChange = (value: number) => {
        if (count + value < 1) return;
        if (count + value > 5) return;
        setCount(count + value);
    }
    return (
        <div className="flex">
            <button
                onClick={() => handleQuantityChange(-1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded-md">
                {count}
            </span>
            <button
                onClick={() => handleQuantityChange(+1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
