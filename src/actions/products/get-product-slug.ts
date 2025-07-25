'use server';

import prisma from "@/lib/prisma";

export const getProductSlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
            where: {
                slug
            }
        })

        if (!product) return null;

        return {
            ...product,
            images: product.ProductImage.map(img => img.url)
        }
    } catch (error) {
        console.error('Error al obtener el slug del producto:', error);
        throw new Error('Error al obtener el slug del producto');
    }
}