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
};
