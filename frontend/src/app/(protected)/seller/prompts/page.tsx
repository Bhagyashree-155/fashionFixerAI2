'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ManagePrompts() {
    const [prompts, setPrompts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setPrompts([
                {
                    _id: '1',
                    title: 'Summer Floral Dress',
                    price: 15,
                    status: 'approved',
                    sales: 12,
                    views: 450,
                    image: 'https://via.placeholder.com/100'
                },
                {
                    _id: '2',
                    title: 'Urban Streetwear Set',
                    price: 25,
                    status: 'pending',
                    sales: 0,
                    views: 12,
                    image: 'https://via.placeholder.com/100'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Prompts</h1>
                    <Link href="/seller/upload" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
                        + New Prompt
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Prompt</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Sales</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prompts.map((prompt) => (
                                    <tr key={prompt._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <img src={prompt.image} alt={prompt.title} className="w-12 h-12 rounded-md object-cover" />
                                                <span className="font-medium text-gray-900">{prompt.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">${prompt.price}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${prompt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    prompt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {prompt.status.charAt(0).toUpperCase() + prompt.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{prompt.sales}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-indigo-600 transition" title="View">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
