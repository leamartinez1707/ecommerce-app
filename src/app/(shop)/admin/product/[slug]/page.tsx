import { getProductSlug } from '@/actions/products/get-product-slug';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import React from 'react'
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions';

interface Props {
    params: { slug: string }
}

const ProductPage = async ({ params }: Props) => {

    const { slug } = params;
    const [product, categories] = await Promise.all([
        getProductSlug(slug),
        getCategories()
    ]);

    if (!product || !categories) {
        redirect('/admin/products');
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';
    return (
        <>
            <Title title={title} />
            <ProductForm product={product} categories={categories} />
        </>
    )
}

export default ProductPage