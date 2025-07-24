'use server';

import prisma from "@/lib/prisma";

export const getStockSlug = async (slug: string) => {

    try {
        const stock = await prisma.product.findFirst({
            where: {
                slug
            },
            select: {
                inStock: true,
            }
        })

        return stock?.inStock ?? 0;
    } catch (error) {
        console.error("Error fetching stock slug:", error);
        return 0;
    }
}