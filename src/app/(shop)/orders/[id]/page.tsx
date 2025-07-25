import { Title } from "@/components";
import { initialData } from "@/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    params:
    Promise<{ id: string }>
}
const CheckoutPage = async ({ params }: Props) => {

    const { id } = await params;

    //todo verificar


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden: #${id}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col ml-5">

                        <div className={clsx(
                            "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                            "bg-red-500": false,
                            "bg-green-600": true,
                        }
                        )}>
                            <IoCardOutline size={30} />
                            <span className="mx-2">Pendiente de pago</span>

                        </div>
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
                                    <p>{product.price} x 3</p>
                                    <span className="font-bold">Subtotal: ${product.price * 3}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-7">


                        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Leandro Martínez</p>
                            <p>Av Italia 123</p>
                            <p>Montevideo</p>
                            <p>Centenario</p>
                            <p>11500</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
                        <h2 className="text-2xl mb-2">Resumen de carrito</h2>

                        <div className="grid grid-cols-2 mb-4">

                            <span>N° productos</span>
                            <span className="text-right">3 artículos</span>
                            <span>Subtotal</span>
                            <span className="text-right">$100</span>
                            <span>Impuestos</span>
                            <span className="text-right mb-5">$15</span>
                            <span className="text-2xl">Total</span>
                            <span className="text-right">$115</span>

                        </div>

                        <div className={clsx(
                            "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                            "bg-red-500": false,
                            "bg-green-600": true,
                        }
                        )}>
                            <IoCardOutline size={30} />
                            <span className="mx-2">Pendiente de pago</span>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
