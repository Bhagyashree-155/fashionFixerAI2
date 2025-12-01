'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesData = [
    { name: 'Mon', sales: 400 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 600 },
    { name: 'Thu', sales: 200 },
    { name: 'Fri', sales: 900 },
    { name: 'Sat', sales: 1200 },
    { name: 'Sun', sales: 800 },
];

const viewsData = [
    { name: 'Mon', views: 2400 },
    { name: 'Tue', views: 1398 },
    { name: 'Wed', views: 9800 },
    { name: 'Thu', views: 3908 },
    { name: 'Fri', views: 4800 },
    { name: 'Sat', views: 3800 },
    { name: 'Sun', views: 4300 },
];

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analytics</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sales Chart */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                        <div className="h-64 w-full bg-gray-50 rounded-lg p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Views Chart */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Prompt Views</h3>
                        <div className="h-64 w-full bg-gray-50 rounded-lg p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={viewsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
