'use client';

import { useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminShops() {
    const [shops, setShops] = useState([
        { _id: '1', name: 'StyleQueen Boutique', owner: 'StyleQueen', sales: 120, revenue: 1800 },
        { _id: '2', name: 'UrbanFit Store', owner: 'UrbanFit', sales: 85, revenue: 2125 },
        { _id: '3', name: 'NeonArt Digital', owner: 'NeonArt', sales: 45, revenue: 900 },
    ]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Shops</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Shop Name</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Owner</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Total Sales</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shops.map((shop) => (
                                <tr key={shop._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 font-medium text-gray-900">{shop.name}</td>
                                    <td className="py-3 px-4 text-gray-700">{shop.owner}</td>
                                    <td className="py-3 px-4 text-gray-700">{shop.sales}</td>
                                    <td className="py-3 px-4 text-gray-700 font-medium">${shop.revenue}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/shop/${shop._id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition" title="Visit Shop">
                                                <ExternalLink size={18} />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition" title="Close Shop">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
