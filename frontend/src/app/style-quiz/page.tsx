'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from "@/context/CartContext";
import toast from 'react-hot-toast';

export default function StyleQuiz() {
    const [step, setStep] = useState<'quiz' | 'results'>('quiz');
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const { addToCart } = useCart();

    // Mock product data (same as Shop page for consistency)
    const allProducts = [
        { id: 1, name: "Classic White Tee", price: 29.99, rating: 4.5, image: "/images/shop/white-tee.jpg", style: "casual" },
        { id: 2, name: "Denim Jacket", price: 89.99, rating: 4.8, image: "/images/shop/denim-jacket.jpg", style: "professional" },
        { id: 3, name: "Summer Dress", price: 59.99, rating: 4.7, image: "/images/shop/new-5.jpg", style: "trendy" },
        { id: 4, name: "Leather Boots", price: 129.99, rating: 4.9, image: "/images/shop/new-4.jpg", style: "professional" },
        { id: 5, name: "Casual Jeans", price: 49.99, rating: 4.4, image: "/images/shop/new-2.jpg", style: "casual" },
        { id: 6, name: "Silk Scarf", price: 34.99, rating: 4.6, image: "/images/shop/silk-scarf.png", style: "unique" },
        { id: 7, name: "Stylish Jeans", price: 54.99, rating: 4.7, image: "/images/shop/stylish-jeans.png", style: "trendy" },
        { id: 8, name: "Modern Denim", price: 64.99, rating: 4.6, image: "/images/shop/modern-denim.png", style: "trendy" },
        { id: 9, name: "Classic Boots", price: 119.99, rating: 4.8, image: "/images/shop/classic-boots.jpg", style: "professional" },
        { id: 10, name: "Floral Dress", price: 69.99, rating: 4.9, image: "/images/shop/floral-dress.jpg", style: "unique" },
        { id: 11, name: "Graphic Tee", price: 24.99, rating: 4.3, image: "/images/shop/graphic-tee.jpg", style: "unique" }
    ];

    const handleOptionClick = (style: string) => {
        // Filter products based on the selected style
        const filtered = allProducts.filter(p => p.style === style);
        setRecommendations(filtered);
        setStep('results');
    };

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`Added ${product.name} to cart!`);
    };

    if (step === 'results') {
        return (
            <div className="min-h-screen p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <Link href="/style-quiz" onClick={() => setStep('quiz')} className="flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                            <FaArrowLeft className="mr-2" /> Retake Quiz
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
                        <p className="text-gray-400">Based on your style profile, we think you'll love these items:</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recommendations.map((product) => (
                            <div key={product.id} className="bg-dark-card rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all group">
                                <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-white truncate">{product.name}</h3>
                                        <span className="text-primary font-bold">${product.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-md text-sm font-medium transition-colors mt-2"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="mb-8 relative">
                    <Link href="/" className="absolute left-0 top-0 flex items-center text-gray-400 hover:text-white transition-colors">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                    <div className="text-center pt-8 sm:pt-0">
                        <h1 className="text-3xl font-bold mb-2">Fashion Style Quiz</h1>
                        <p className="text-gray-400 text-sm">
                            Answer one simple question to discover your personal style profile and get tailored fashion recommendations.
                        </p>
                    </div>
                </div>

                {/* Quiz Container */}
                <div className="bg-dark-card rounded-2xl border border-gray-800 p-8">
                    {/* Question */}
                    <h2 className="text-xl font-bold mb-6 text-center">
                        How would you describe your everyday style?
                    </h2>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Option 1: Casual */}
                        <button
                            onClick={() => handleOptionClick('casual')}
                            className="group relative bg-dark-bg rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all text-left"
                        >
                            <div className="aspect-[4/3] bg-gray-800 relative">
                                <img
                                    src="/images/quiz/option-1.jpg"
                                    alt="Casual and comfortable"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-white group-hover:text-primary transition-colors">Casual and comfortable</h3>
                            </div>
                        </button>

                        {/* Option 2: Professional */}
                        <button
                            onClick={() => handleOptionClick('professional')}
                            className="group relative bg-dark-bg rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all text-left"
                        >
                            <div className="aspect-[4/3] bg-gray-800 relative">
                                <img
                                    src="/images/quiz/fix-option-2.png"
                                    alt="Professional and polished"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-white group-hover:text-primary transition-colors">Professional and polished</h3>
                            </div>
                        </button>

                        {/* Option 3: Trendy */}
                        <button
                            onClick={() => handleOptionClick('trendy')}
                            className="group relative bg-dark-bg rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all text-left"
                        >
                            <div className="aspect-[4/3] bg-gray-800 relative">
                                <img
                                    src="/images/quiz/option-3.jpg"
                                    alt="Trendy and fashion-forward"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-white group-hover:text-primary transition-colors">Trendy and fashion-forward</h3>
                            </div>
                        </button>

                        {/* Option 4: Unique */}
                        <button
                            onClick={() => handleOptionClick('unique')}
                            className="group relative bg-dark-bg rounded-xl overflow-hidden border border-gray-700 hover:border-primary transition-all text-left"
                        >
                            <div className="aspect-[4/3] bg-gray-800 relative">
                                <img
                                    src="/images/quiz/option-4.jpg"
                                    alt="Unique and expressive"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-white group-hover:text-primary transition-colors">Unique and expressive</h3>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
