'use client';

import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPrompts() {
    const [prompts, setPrompts] = useState([
        { _id: '1', title: 'Summer Floral Dress', seller: 'StyleQueen', status: 'pending', price: 15 },
        { _id: '2', title: 'Cyberpunk Cityscape', seller: 'NeonArt', status: 'pending', price: 20 },
        { _id: '3', title: 'Minimalist Logo Pack', seller: 'DesignPro', status: 'approved', price: 50 },
    ]);

    const handleApprove = (id: string) => {
        setPrompts(prompts.map(p => p._id === id ? { ...p, status: 'approved' } : p));
        toast.success('Prompt approved!');
    };

    const handleReject = (id: string) => {
        setPrompts(prompts.map(p => p._id === id ? { ...p, status: 'rejected' } : p));
        toast.error('Prompt rejected.');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Prompt Moderation</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Prompt</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Seller</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prompts.map((prompt) => (
                                <tr key={prompt._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 font-medium text-gray-900">{prompt.title}</td>
                                    <td className="py-3 px-4 text-gray-700">{prompt.seller}</td>
                                    <td className="py-3 px-4 text-gray-700">${prompt.price}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${prompt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                prompt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {prompt.status.charAt(0).toUpperCase() + prompt.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition" title="View">
                                                <Eye size={18} />
                                            </button>
                                            {prompt.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(prompt._id)}
                                                        className="p-2 text-gray-400 hover:text-green-600 transition"
                                                        title="Approve"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(prompt._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition"
                                                        title="Reject"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            )}
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
