'use server'

import { Gender } from "@prisma/client";
import prisma from "@/lib/prisma"

interface PaginatedProducts {
    page?: number;
    take?: number;
    gender?: string;
}


export const getPaginatedProductsWithImages = async ({ page = 1, take = 5, gender }: PaginatedProducts) => {

    if (isNaN(Number(page)) || isNaN(Number(take))) {
        page = 1;
        take = 5;
    }
    if (page < 1) page = 1;

    try {
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                price: 'desc'
            },
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },
            where: {
                gender: gender as Gender
            }
        })

        // Obtener total de paginas 
        const totalCount = await prisma.product.count({
            where: {
                gender: gender as Gender
            }
        });
        const totalPage = Math.ceil(totalCount / take);
        return {
            products: products.map(prd => ({
                ...prd,
                images: prd.ProductImage.map(img => img.url)
            })),
            totalPage,
            currentPage: page,
        }
    } catch (error) {
        console.error("Error al obtener productos paginados:", error)
        throw new Error("Error al obtener productos")
    }
}