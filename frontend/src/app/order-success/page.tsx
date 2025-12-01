'use client';

import Link from 'next/link';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function OrderSuccess() {
    return (
        <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-dark-card p-8 rounded-2xl border border-gray-800 max-w-md w-full">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <FaCheckCircle size={40} />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
                <p className="text-gray-400 mb-8">
                    Thank you for your purchase. Your order has been successfully placed and will be shipped soon.
                </p>

                <div className="space-y-4">
                    <Link href="/shop">
                        <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                            Continue Shopping <FaArrowRight />
                        </button>
                    </Link>
                    <Link href="/">
                        <button className="w-full bg-transparent border border-gray-700 hover:border-white text-gray-400 hover:text-white py-3 rounded-md font-medium transition-colors">
                            Return to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
