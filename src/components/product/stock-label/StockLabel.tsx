'use client';

import { getStockSlug } from '@/actions/products/get-stock-slug';
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getStock = async () => {
            const stock = await getStockSlug(slug);
            setStock(stock);
            setIsLoading(false);
        }
        getStock();
    }, [slug]);


    return (
        <p className='antialiased font-sans text-blue-500 text-xl'>
            {isLoading ? 'Cargando stock...' : `${stock > 0 ? 'En stock' : 'Sin stock'}`}
        </p>
    )
}

export default StockLabel;