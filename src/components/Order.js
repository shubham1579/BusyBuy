import { useProductValue } from '../productContext';
import Navbar from './Navbar';
import { FadeLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

function Order(){

    const { orders, ordersLoading } = useProductValue();

    return (
        <>
            <Navbar />
            {orders.length > 0 && ordersLoading ? <FadeLoader cssOverride={override} color="#0080f8" /> : (
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 flex h-full flex-col  bg-white">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-2xl font-medium text-gray-900">Your Orders</h2>
                        </div>

                        {orders.length > 0 && orders.map((ord, i) => (
                            <div className="mt-8 border-2 p-2 rounded-md" key={i}>
                                <h2 className="text-lg mb-2 font-medium text-gray-900">Ordered At: {ord.time}</h2>
                                <div className="flow-root">
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {orders[i].order.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${product.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty {product.quantity}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border-t mt-6 border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${ord.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )

}

export default Order;