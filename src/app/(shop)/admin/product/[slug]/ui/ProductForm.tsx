"use client";

import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { createOrUpdateProduct } from "@/actions";
import { Gender, Product, ProductImage, Size } from "@/interfaces/product.interfaces";
import clsx from "clsx";
import Image from "next/image";

interface Props {
    product: Product & { ProductImage?: ProductImage[] };
    categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: Size[];
    tags: string;
    gender: Gender;
    categoryId: string;
}

export const ProductForm = ({ product, categories }: Props) => {

    const { handleSubmit, register, formState: { isValid }, getValues, setValue, watch } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags.join(', '),
            sizes: product.sizes ?? []
        }
    });

    // Refrezca la UI si hay cambios en tallas
    watch('sizes');

    const onSizeChange = (size: Size) => {
        // Crea un nuevo array y borra los duplicados
        const currentSizes = new Set(getValues('sizes'));
        if (currentSizes.has(size)) {
            currentSizes.delete(size);
        } else {
            currentSizes.add(size);
        }

        setValue('sizes', Array.from(currentSizes));
    }

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();
        const { ...productToSave } = data;
        formData.append('id', product.id ?? '');
        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('inStock', productToSave.inStock?.toString() ?? '0');
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('tags', productToSave.tags);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('gender', productToSave.gender);

        const { ok } = await createOrUpdateProduct(formData);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
                {/* Textos */}
                <div className="w-full">
                    <div className="flex flex-col mb-2">
                        <span>Título</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title')} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Slug</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug')} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Descripción</span>
                        <textarea
                            rows={5}
                            className="p-2 border rounded-md bg-gray-200"
                            {...register('description')}
                        ></textarea>
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Price</span>
                        <input type="number" className="p-2 border rounded-md bg-gray-200"
                            {...register('price', { required: true })} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Tags</span>
                        <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Gender</span>
                        <select className="p-2 border rounded-md bg-gray-200" {...register('gender')}
                        >
                            <option value="">[Seleccione]</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kid">Kid</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Categoria</span>
                        <select className="p-2 border rounded-md bg-gray-200"
                            {...register('categoryId', { required: true })}
                        >
                            <option value="">[Seleccione]</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        disabled={!isValid}
                        type="submit"
                        className="btn-primary w-full">
                        Guardar
                    </button>
                </div>

                {/* Selector de tallas y fotos */}
                <div className="w-full">
                    {/* As checkboxes */}
                    <div className="flex flex-col">

                        <span>Tallas</span>
                        <div className="flex flex-wrap">

                            {
                                sizes.map(size => (
                                    // bg-blue-500 text-white <--- si está seleccionado
                                    <div key={size}
                                        onClick={() => onSizeChange(size)}
                                        className={clsx(
                                            "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                                            {
                                                "bg-blue-500 text-white": getValues('sizes').includes(size),
                                                "bg-gray-200": !getValues('sizes').includes(size)
                                            }
                                        )}>
                                        <span>{size}</span>
                                    </div>
                                ))
                            }

                        </div>


                        <div className="flex flex-col mb-2">

                            <span>Fotos</span>
                            <input
                                type="file"
                                multiple
                                className="p-2 border rounded-md bg-gray-200"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                            />

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            {product.ProductImage?.map(img => (
                                <div key={img.id}>
                                    <Image
                                        alt={product.title}
                                        src={`/products/${img.url}`}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md"
                                    />
                                    <button
                                        onClick={() => console.log('Eliminar', img.id)}
                                        type="button" className="btn-danger rounded-b-xl w-full max-w-[300px]">Eliminar</button>
                                </div>
                            ))}



                        </div>

                    </div>
                </div>
            </form>
        </>
    );
};