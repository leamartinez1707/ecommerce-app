import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
const CartPage = () => {


  // if (productsInCart.length === 0) {
  //   redirect('/cart');
  // }
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito de compras" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col ml-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continuar comprando
            </Link>


            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="text-red-500 underline">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Resumen de ordenes</h2>

            <div className="grid grid-cols-2">

              <span>N° productos</span>
              <span className="text-right">3 artículos</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Impuestos</span>
              <span className="text-right">$15</span>
              <span>Total</span>
              <span className="text-right">$115</span>

            </div>
            <div className="mt-5 mb-2 w-full">
              <Link href={'/checkout/address'}
                className="flex btn-primary justify-center"
              >
                Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
