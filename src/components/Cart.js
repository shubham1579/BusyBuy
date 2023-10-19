import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useProductValue } from '../productContext';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useEffect } from 'react';
import { FadeLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

function Cart() {

    const { cartItems, handleOrders, isCartEmpty, isPurchased, setIsPurchased, removeFromCart, incCount, decCount, cartLoading } = useProductValue();

    const cartTotal = cartItems.reduce((acc, curr) => {
        return acc + Number(curr.price * curr.quantity);
    }, 0);
    

    const navigate = useNavigate();

    useEffect(() => {

        if(isPurchased){
            navigate('/orders');
            setIsPurchased(false);
        }

    }, [navigate, isPurchased, setIsPurchased]);

    return (
        <>
            <Navbar />
            {cartLoading ? <FadeLoader cssOverride={override} color="#0080f8" /> : (
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 flex h-full flex-col bg-white">
                {isCartEmpty ? <h2 className="text-3xl font-medium text-gray-900 text-center mt-4">Your cart is Empty</h2> : (
                    <>
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-2xl font-medium text-gray-900">Shopping cart</h2>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((product) => (
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
                                                                <p>{product.title}</p>
                                                            </h3>
                                                            <p className="ml-4">${product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {product.color}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500 text-base">
                                                            Qty &nbsp; 
                                                            <AiOutlineMinusCircle onClick={() => decCount(product)} className='inline-block hover:cursor-pointer' /> {product.quantity}{' '}
                                                            <AiOutlinePlusCircle onClick={() => incCount(product)} className='inline-block hover:cursor-pointer' />
                                                        </p>

                                                        <div className="flex">
                                                            <button
                                                                onClick={() => removeFromCart(product)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${cartItems && cartTotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <div
                                    onClick={() => handleOrders(cartItems, cartTotal)}
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 hover:cursor-pointer"
                                >
                                    Purchase
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or&nbsp;
                                    <Link
                                        to={'/'}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </>
                )}
                </div>
            )}
            
        </>
    )
}

export default Cart;