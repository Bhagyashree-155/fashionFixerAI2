'use client';

import { useUser } from '@clerk/nextjs';
import { ShoppingBag, Star, Clock } from 'lucide-react';

export default function Dashboard() {
    const { user } = useUser();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.firstName || 'Fashionista'}!
                </h1>
                <p className="text-gray-600">
                    Here's what's happening with your fashion journey today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Reviews Given</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Purchase</p>
                        <p className="text-lg font-bold text-gray-900">2 days ago</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mock Recommendations */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="h-32 bg-gray-100 rounded-md mb-3"></div>
                            <h3 className="font-semibold text-gray-800">Summer Collection #{i}</h3>
                            <p className="text-indigo-600 font-bold mt-1">$19.99</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
