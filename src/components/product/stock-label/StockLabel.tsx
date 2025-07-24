'use client';

import { getStockSlug } from '@/actions/products/get-stock-slug';
import { titleFont } from '@/app/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getStock = async () => {
        const stock = await getStockSlug(slug);
        setStock(stock);
        setIsLoading(false);
    }

    useEffect(() => {
        getStock();
    }, [])


    return (
        <p className={`${titleFont.className} antialiased font-sans text-lg`}>
            {isLoading ? 'Cargando stock...' : `Stock: ${stock}`}
        </p>
    )
}

export default StockLabel;