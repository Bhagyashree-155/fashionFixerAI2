'use client';

import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from 'react';

const Navbar = () => {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isLoaded && user) {
                try {
                    const response = await fetch('http://localhost:5000/api/v1/auth/sync', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress || '',
                            username: user.fullName || user.username || 'User',
                            photo: user.imageUrl || ''
                        })
                    });

                    const data = await response.json();
                    console.log('User synced with MongoDB:', data);

                    // Store MongoDB user ID in localStorage for later use
                    if (data.success && data.data) {
                        localStorage.setItem('mongoUserId', data.data._id);
                    }
                } catch (error) {
                    console.error('Error syncing user:', error);
                }
            }
        };

        syncUserWithBackend();
    }, [isLoaded, user]);

    return (
        <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
                            <span className="text-primary">✨</span> FashionFixer
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/style-suggestions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Style Suggestions
                            </Link>
                            <Link href="/virtual-try-on" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Virtual Try-On
                            </Link>
                            <Link href="/style-quiz" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Style Quiz
                            </Link>
                            <Link href="/shop" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Shop
                            </Link>
                            <Link href="/cart" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Cart
                            </Link>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Log In
                                </button>
                            </SignInButton>
                            <Link href="/sign-up" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Sign Up
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
