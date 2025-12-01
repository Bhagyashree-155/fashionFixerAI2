import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FashionFixerAI",
    description: "AI Driven Fashion Recommendation System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <CartProvider>
                <html lang="en">
                    <body className={`${inter.className} bg-dark-bg text-white min-h-screen flex flex-col`}>
                        <Navbar />
                        <main className="pt-16 flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <Toaster position="bottom-right" />
                    </body>
                </html>
            </CartProvider>
        </ClerkProvider>
    );
}
