'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setOrders([
                {
                    _id: 'ORD-123456',
                    date: '2023-11-15',
                    status: 'completed',
                    total: 15.00,
                    prompt: {
                        title: 'Summer Floral Dress',
                        image: 'https://via.placeholder.com/100'
                    },
                    seller: 'StyleQueen'
                },
                {
                    _id: 'ORD-789012',
                    date: '2023-10-28',
                    status: 'completed',
                    total: 25.00,
                    prompt: {
                        title: 'Urban Streetwear Set',
                        image: 'https://via.placeholder.com/100'
                    },
                    seller: 'UrbanFit'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No orders found. <Link href="/explore" className="text-indigo-600 hover:underline">Start shopping!</Link>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={order.prompt.image} alt={order.prompt.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-bold text-gray-900">{order.prompt.title}</h3>
                                        <p className="text-sm text-gray-500">Sold by {order.seller}</p>
                                    </div>

                                    <div className="text-center sm:text-right">
                                        <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                        <div className="flex items-center justify-center sm:justify-end gap-1 text-sm text-gray-500 mt-1">
                                            <Calendar size={14} />
                                            <span>{order.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition" title="Download Prompt">
                                            <Download size={20} />
                                        </button>
                                        <Link href={`/prompt/${order.prompt._id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition">
                                            <ChevronRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
