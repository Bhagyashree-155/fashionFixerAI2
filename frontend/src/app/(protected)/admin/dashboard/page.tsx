'use client';

import { Users, ShoppingBag, DollarSign, Store } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Admin Overview
                </h1>
                <p className="text-gray-600">
                    Platform-wide statistics and management.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,245</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Total Prompts</p>
                    <p className="text-2xl font-bold text-gray-900">8,432</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <Store size={24} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Active Shops</p>
                    <p className="text-2xl font-bold text-gray-900">320</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$45,230</p>
                </div>
            </div>

            {/* Recent Activity (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Platform Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                    U{i}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">ID: #{1000 + i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
