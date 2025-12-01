'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ShoppingBag, DollarSign, ShieldCheck, Store } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Prompts', href: '/admin/prompts', icon: ShoppingBag },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Shops', href: '/admin/shops', icon: Store },
        { name: 'Withdrawals', href: '/admin/withdrawals', icon: DollarSign },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
                        <div className="px-4 py-2 mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-indigo-600" size={20} />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admin Panel</span>
                        </div>
                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
