'use client';

import Link from 'next/link';
import { FaArrowLeft, FaCreditCard, FaPaypal, FaGoogle } from 'react-icons/fa';
import { useCart } from "@/context/CartContext";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handlePlaceOrder = async () => {
        // Validate form
        if (!firstName || !lastName || !address || !city || !postalCode || !phone) {
            toast.error('Please fill in all shipping details');
            return;
        }

        setIsProcessing(true);

        try {
            // Get MongoDB user ID from localStorage
            const mongoUserId = localStorage.getItem('mongoUserId');

            if (!mongoUserId) {
                toast.error('Please log in to place an order');
                setIsProcessing(false);
                return;
            }

            // Prepare order data
            const orderData = {
                buyerId: mongoUserId,
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                })),
                shippingAddress: {
                    firstName,
                    lastName,
                    address,
                    city,
                    postalCode,
                    phone
                },
                totalAmount: cartTotal + 5.99, // Including shipping
                paymentMethod,
                paymentId: `PAY-${Date.now()}` // Simulated payment ID
            };

            // Send to backend
            const response = await fetch('http://localhost:5000/api/v1/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (data.success) {
                setIsProcessing(false);
                clearCart();
                toast.success('Order placed successfully!');
                router.push('/order-success');
            } else {
                throw new Error(data.message || 'Order failed');
            }
        } catch (error) {
            console.error('Order error:', error);
            setIsProcessing(false);
            toast.error('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/cart" className="flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                        <FaArrowLeft className="mr-2" /> Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping Address */}
                    <div className="space-y-6">
                        <div className="bg-dark-card p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">First Name</label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Last Name</label>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">City</label>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Postal Code</label>
                                        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" required />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-6">
                        <div className="bg-dark-card p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-4 border border-primary bg-primary/10 rounded-lg cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" checked={paymentMethod === 'Credit Card'} onChange={() => setPaymentMethod('Credit Card')} className="text-primary focus:ring-primary" />
                                        <span className="font-medium">Credit Card</span>
                                    </div>
                                    <FaCreditCard className="text-primary" />
                                </label>
                                <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" checked={paymentMethod === 'PayPal'} onChange={() => setPaymentMethod('PayPal')} className="text-primary focus:ring-primary" />
                                        <span className="font-medium">PayPal</span>
                                    </div>
                                    <FaPaypal className="text-blue-500" />
                                </label>
                                <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" checked={paymentMethod === 'Google Pay'} onChange={() => setPaymentMethod('Google Pay')} className="text-primary focus:ring-primary" />
                                        <span className="font-medium">Google Pay</span>
                                    </div>
                                    <FaGoogle className="text-red-500" />
                                </label>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <div className="flex justify-between text-lg font-bold mb-6">
                                    <span>Total to Pay</span>
                                    <span>${(cartTotal + 5.99).toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md font-bold transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isProcessing ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
