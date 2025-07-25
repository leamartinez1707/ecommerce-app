import { initialData } from "../seed";
import prisma from "../lib/prisma";

const main = async () => {

    // Borrar registros de la base de datos
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    // Insertar datos iniciales
    const { categories, products } = initialData;

    const categoriesData = categories.map((name) => ({ name }))
    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map
    }, {} as Record<string, string>)

    // Productos
    products.forEach(async (product) => {

        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })


        // Imágenes
        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    console.log("Base de datos inicializada correctamente");
    await prisma.$disconnect();
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main()
})();