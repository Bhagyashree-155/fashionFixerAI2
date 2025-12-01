'use client';

import { useUser } from '@clerk/nextjs';
import { User, Mail, Shield } from 'lucide-react';

export default function Profile() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return <div className="p-6">Loading...</div>;
    }

    if (!user) {
        return <div className="p-6">Please sign in to view your profile.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            className="w-32 h-32 rounded-full border-4 border-indigo-50"
                        />
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                            {user.publicMetadata.role as string || 'Buyer'}
                        </span>
                    </div>

                    <div className="flex-1 space-y-6 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <User size={20} className="text-gray-400" />
                                    <span className="text-gray-900 font-medium">{user.fullName}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Mail size={20} className="text-gray-400" />
                                    <span className="text-gray-900 font-medium">{user.primaryEmailAddress?.emailAddress}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Shield className="text-yellow-600 mt-1" size={20} />
                                <div>
                                    <h3 className="font-bold text-yellow-800">Account Security</h3>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Your account is managed securely via Clerk. To update your password or security settings, please visit the User Profile settings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
