'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShoppingCart, Share2, Heart } from 'lucide-react';
import api from '@/lib/axios';

export default function PromptDetails() {
    const params = useParams();
    const { id } = params;
    const [prompt, setPrompt] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch - replace with actual API call
        const fetchPrompt = async () => {
            try {
                // const res = await api.get(`/prompts/${id}`);
                // setPrompt(res.data.data);

                // Mock data for now
                setTimeout(() => {
                    setPrompt({
                        _id: id,
                        title: 'Summer Floral Dress Prompt',
                        description: 'A beautiful, airy summer dress design with floral patterns. Perfect for garden parties and beach walks. Includes detailed prompt instructions for Midjourney v5.',
                        images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'],
                        price: 15,
                        rating: 4.5,
                        numReviews: 12,
                        category: 'Casual',
                        tags: ['summer', 'floral', 'dress', 'midjourney'],
                        sellerId: {
                            username: 'StyleQueen',
                            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
                        }
                    });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching prompt:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchPrompt();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!prompt) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Prompt not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={prompt.images[0]}
                            alt={prompt.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Thumbnails would go here */}
                </div>

                {/* Product Info */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                            {prompt.category}
                        </span>
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-red-500 transition">
                                <Heart size={24} />
                            </button>
                            <button className="text-gray-400 hover:text-indigo-600 transition">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{prompt.title}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star fill="currentColor" size={20} />
                            <span className="font-bold text-lg">{prompt.rating}</span>
                        </div>
                        <span className="text-gray-500">({prompt.numReviews} reviews)</span>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                            <img src={prompt.sellerId.photo} alt={prompt.sellerId.username} className="w-8 h-8 rounded-full" />
                            <span className="text-gray-700 font-medium">{prompt.sellerId.username}</span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-gray-900 mb-8">
                        ${prompt.price}
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {prompt.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {prompt.tags.map((tag: string) => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                            <ShoppingCart size={24} />
                            Buy Prompt
                        </button>
                        <button className="px-6 py-4 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition">
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
