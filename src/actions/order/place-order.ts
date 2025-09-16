"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address.interface";
import { Size } from "@/interfaces/product.interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId)
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.productId),
      },
    },
  });

  const itemsInOrder = productsIds.reduce(
    (count, product) => count + product.quantity,
    0
  );
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((prd) => prd.id === item.productId);
      if (!product) throw new Error(`${item.productId} no encontrado`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // crear transaccion

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      // Actualizar el stock de los productos

      const updatedProductsPromises = products.map((product) => {

        // Acumular valores

        const productQuantity = productsIds.filter(prd => prd.productId === product.id).reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) throw new Error(`${product.id} no tiene cantidad definida`);


        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: { decrement: productQuantity }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)
      // Verificar valores negativos en el stock

      updatedProducts.forEach((prd) => {
        if (prd.inStock < 0) throw new Error(`El producto ${prd.title} se ha quedado sin stock momentáneamente.`)
      })

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productsIds.map(prd => ({
                quantity: prd.quantity,
                size: prd.size,
                productId: prd.productId,
                price: products.find(product => product.id === prd.productId)?.price ?? 0 // Esto no deberia ser 0
              }))
            }
          },

        }
      })

      // Si el price es 0 enviar un error
      if (productsIds.some(prd => products.find(product => product.id === prd.productId)?.price === 0)) {
        return {
          ok: false,
          message: "Error en la transacción",
        };
      }

      // Insertar la direccion de la persona

      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      });

      return {
        updatedProducts,
        order,
        orderAddress
      };
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }

  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: 'Error en la transacción',
    }

  }
};