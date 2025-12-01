'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminWithdrawals() {
    const [withdrawals, setWithdrawals] = useState([
        { _id: '1', user: 'StyleQueen', amount: 150, method: 'Bank Transfer', status: 'pending', date: '2023-11-20' },
        { _id: '2', user: 'UrbanFit', amount: 500, method: 'PayPal', status: 'approved', date: '2023-11-18' },
    ]);

    const handleApprove = (id: string) => {
        setWithdrawals(withdrawals.map(w => w._id === id ? { ...w, status: 'approved' } : w));
        toast.success('Withdrawal approved.');
    };

    const handleReject = (id: string) => {
        setWithdrawals(withdrawals.map(w => w._id === id ? { ...w, status: 'rejected' } : w));
        toast.error('Withdrawal rejected.');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Withdrawal Requests</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">User</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Method</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((withdrawal) => (
                                <tr key={withdrawal._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 font-medium text-gray-900">{withdrawal.user}</td>
                                    <td className="py-3 px-4 text-gray-900 font-bold">${withdrawal.amount}</td>
                                    <td className="py-3 px-4 text-gray-700">{withdrawal.method}</td>
                                    <td className="py-3 px-4 text-gray-700">{withdrawal.date}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${withdrawal.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {withdrawal.status === 'pending' && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleApprove(withdrawal._id)}
                                                    className="p-2 text-gray-400 hover:text-green-600 transition"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(withdrawal._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition"
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        )}
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
