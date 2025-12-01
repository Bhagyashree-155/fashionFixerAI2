'use client';

import { useState } from 'react';
import { Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
    const [users, setUsers] = useState([
        { _id: '1', username: 'john_doe', email: 'john@example.com', role: 'user', joined: '2023-11-01' },
        { _id: '2', username: 'jane_seller', email: 'jane@example.com', role: 'seller', joined: '2023-10-15' },
        { _id: '3', username: 'admin_user', email: 'admin@example.com', role: 'admin', joined: '2023-09-20' },
    ]);

    const handleDelete = (id: string) => {
        setUsers(users.filter(u => u._id !== id));
        toast.success('User deleted successfully.');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">User</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Role</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Joined</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 font-medium text-gray-900">{user.username}</td>
                                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                user.role === 'seller' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">{user.joined}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition" title="Change Role">
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition"
                                                title="Delete User"
                                            >
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
