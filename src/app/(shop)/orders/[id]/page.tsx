import { getOrderById } from "@/actions";
import { PaypalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

interface Props {
    params:
    Promise<{ id: string }>
}
const CheckoutPage = async ({ params }: Props) => {
    const { id } = await params;

    //todo verificar
    // llamar server action
    const { order, ok } = await getOrderById(id);
    if (!order) {
        return <div>Orden no encontrada</div>
    }
    if (!ok) {
        return <div>Error al obtener la orden, consulte con un administrador.</div>
    }
    const address = order!.OrderAddress;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden: #${order.id.split('-').at(-1)}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col ml-5">
                        <h2 className="text-2xl mb-5 font-bold">Resumen de la orden</h2>
                        {/* Items */}
                        {order.OrderItem.map((product) => (
                            <div key={product.product.slug} className="flex mb-5">
                                <Image
                                    src={`/products/${product.product.ProductImage[0].url}`}
                                    alt={product.product.title}
                                    width={100}
                                    style={{
                                        width: '100px',
                                        height: '100px'
                                    }}
                                    height={100}
                                    className="mr-5 rounded"
                                />

                                <div>
                                    <p>{product.price}</p>
                                    <p>{product.quantity} x 3</p>
                                    <span className="font-bold">Subtotal: ${product.price * 3}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-7">


                        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">
                                {address?.firstName} {address?.lastName}
                            </p>
                            <p>{address?.address}</p>
                            <p>{address?.address2}</p>
                            <p>{address?.postalCode}</p>
                            <p>
                                {address?.city}, {address?.countryId}
                            </p>
                            <p>{address?.phone}</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
                        <h2 className="text-2xl mb-2">Resumen de carrito</h2>

                        <div className="grid grid-cols-2">
                            <span>N° productos</span>
                            <span className="text-right">{order.itemsInOrder === 1 ? '1 producto' : `${order.itemsInOrder} productos`}</span>
                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order.subTotal)}</span>
                            <span>Impuestos</span>
                            <span className="text-right mb-5">{currencyFormat(order.tax)}</span>
                            <span className="text-2xl">Total</span>
                            <span className="text-right">{currencyFormat(order.total)}</span>
                        </div>

                        <div>
                            <PaypalButton
                                orderId={order.id}
                                amount={order.total}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
