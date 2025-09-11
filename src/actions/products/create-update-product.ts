'use server'

import { Gender } from '@prisma/client';
import { z } from 'zod';

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

    return { ok: true }
}