import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

export const OrderStatus = ({ isPaid }: { isPaid: boolean }) => {
    return (
        <div className={clsx({
            "flex items-center text-white mb-2 px-2 font-bold rounded-md": true,
            "bg-red-500 ": !isPaid,
            "bg-green-600 ": isPaid,
        })}>
            <IoCardOutline size={30} />
            <span className="mx-2">{isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
        </div>
    )
}

export default OrderStatus