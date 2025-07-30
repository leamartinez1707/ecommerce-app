'use client';
import type { Size } from "@/interfaces/product.interfaces"
import clsx from "clsx"

interface SizeSelectorProps {
    selectedSize?: Size
    availableSizes: Size[]
    onSizeChange: (size: Size) => void
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
    return (
        <div className="my-5">

            <h3 className="font-bold mb-4">Tallas disponibles</h3>

            <div className="flex">
                {availableSizes.map((size) => (
                    <button
                        onClick={() => onSizeChange(size)}
                        key={size}
                        className={
                            clsx("mx-2 hover:underline text-lg hover:cursor-pointer",
                                { "underline font-semibold": selectedSize === size },
                            )
                        }
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}
