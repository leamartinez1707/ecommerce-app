import { Title } from "@/components";
import Link from "next/link";
import ProductsInCart from "./ui/ProductsInCart";
import OrderSummary from "./ui/OrderSummary";
// import { redirect } from "next/navigation";


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
            <ProductsInCart />
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col justify-between content-center h-fit">
            <div className="grid grid-cols-2">
              <h2 className="col-span-2 text-2xl mb-2">Resumen de ordenes</h2>
              <OrderSummary />
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
