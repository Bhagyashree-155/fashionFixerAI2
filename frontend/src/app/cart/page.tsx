'use client';

import Link from 'next/link';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from "@/context/CartContext";

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    const shipping = 5.99;
    const total = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-medium transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/shop" className="flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                        <FaArrowLeft className="mr-2" /> Continue Shopping
                    </Link>
                    <h1 className="text-3xl font-bold">Your Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-dark-card p-4 rounded-xl border border-gray-800 flex gap-4 items-center">
                                <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-white text-lg">{item.name}</h3>
                                    <p className="text-primary font-bold">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-dark-card p-6 rounded-xl border border-gray-800 h-fit">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-700 pt-4 flex justify-between text-white font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md font-medium transition-colors">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
