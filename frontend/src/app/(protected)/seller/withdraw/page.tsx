'use client';

import { useState } from 'react';
import { DollarSign, CreditCard, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Withdraw() {
    const [amount, setAmount] = useState('');

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Withdrawal request submitted!');
        setAmount('');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-indigo-100 mb-1">Available Balance</p>
                    <h2 className="text-4xl font-bold mb-6">$1,245.00</h2>
                    <div className="flex gap-4">
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <p className="text-xs text-indigo-200">Pending</p>
                            <p className="font-semibold">$150.00</p>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <p className="text-xs text-indigo-200">Withdrawn</p>
                            <p className="font-semibold">$4,500.00</p>
                        </div>
                    </div>
                </div>

                {/* Request Withdrawal Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Request Withdrawal</h3>
                    <form onSubmit={handleWithdraw} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    min="10"
                                    max="1245"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: $10.00</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                        >
                            Withdraw Funds
                        </button>
                    </form>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
                    <button className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                        <Plus size={16} /> Add Method
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-md">
                                <CreditCard className="text-gray-600" size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Bank of America</p>
                                <p className="text-sm text-gray-500">**** **** **** 4589</p>
                            </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Primary</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
