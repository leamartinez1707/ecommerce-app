'use server'

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const createOrUpdateProduct = async (formData: FormData) => {

    const productSchema = z.object({
        id: z.uuid().optional().nullable(),
        title: z.string().min(3).max(255),
        slug: z.string().min(3).max(255),
        description: z.string().min(10).max(1000),
        price: z.coerce.number().min(0).transform((val) => Number(val.toFixed(2))),
        inStock: z.coerce.number().min(0).transform((val) => Number(val.toFixed(0))),
        sizes: z.coerce.string().transform((val) => val.split(',').map(s => s.trim())),
        tags: z.string(),
        gender: z.enum(Gender),
        categoryId: z.uuid()
    });

    const result = productSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return { ok: false, errors: result.error }
    }

    const parsedProduct = result.data;
    parsedProduct.slug = parsedProduct.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = parsedProduct;

    try {
        const prismaTx = await prisma.$transaction(async () => {
            let product: Product;
            const tagsArray = rest.tags.split(',').map(t => t.trim().toLowerCase());
            if (id) {
                //actualizar
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            } else {
                // crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }

            // Cargar imagenes
            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);
                if (!images) {
                    throw new Error('Error uploading images');
                }

                await prisma.productImage.createMany({
                    data: images.map(img => ({
                        url: img!,
                        productId: product.id
                    }))
                })
            }
            return {
                product
            };
        })

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${prismaTx.product.slug}`);
        revalidatePath(`/products/${prismaTx.product.slug}`);

        return { ok: true, product: prismaTx.product }

    } catch (error) {
        console.log(error);
        return { ok: false, errors: 'No se pudo guardar el producto' }
    }


}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {

            try {
                // Convierte el archivo a un string base64
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(res => res.secure_url);
            } catch (error) {
                console.log('Error uploading image:', error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.log(error);
        return null;
    }

}