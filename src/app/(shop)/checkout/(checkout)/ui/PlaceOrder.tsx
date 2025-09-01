"use client";

import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { subTotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

    const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(prd => ({
      productId: prd.id,
      quantity: prd.quantity,
      size: prd.size
    }))


    setIsPlacingOrder(false);
  };

  if (loaded) return <p>Cargando..</p>;
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Resumen de carrito</h2>

      <div className="grid grid-cols-2">
        <span>N° productos</span>
        <span className="text-right">{itemsInCart}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos</span>
        <span className="text-right mb-5">{currencyFormat(tax)}</span>
        <span className="text-2xl">Total</span>
        <span className="text-right">{currencyFormat(total)}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al aceptar la órden usted acepta los{" "}
            <a href="#" className="underline">
              términos y condiciones{" "}
            </a>
            de la tienda.
          </span>
        </p>
        {/* <p className="text-red-500">Error de creacion</p> */}
        <button
          // href={"/orders/123"}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
