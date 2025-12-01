'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import PromptCard from '@/components/PromptCard';
import api from '@/lib/axios';

// Mock data for initial render before API connection
const MOCK_PROMPTS = [
    { _id: '1', title: 'Summer Floral Dress', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'], price: 15, rating: 4.5, category: 'Casual', sellerId: { username: 'StyleQueen' } },
    { _id: '2', title: 'Urban Streetwear Set', images: ['https://images.unsplash.com/photo-1529139574466-a302d2d3f524?w=500&q=80'], price: 25, rating: 4.8, category: 'Streetwear', sellerId: { username: 'UrbanFit' } },
    { _id: '3', title: 'Business Casual Suit', images: ['https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80'], price: 40, rating: 4.2, category: 'Business', sellerId: { username: 'ProAttire' } },
    { _id: '4', title: 'Boho Chic Outfit', images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80'], price: 20, rating: 4.6, category: 'Casual', sellerId: { username: 'BohoLife' } },
    { _id: '5', title: 'Gym Activewear', images: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80'], price: 18, rating: 4.7, category: 'Sport', sellerId: { username: 'FitFam' } },
    { _id: '6', title: 'Evening Gala Gown', images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80'], price: 50, rating: 4.9, category: 'Party', sellerId: { username: 'LuxeStyle' } },
    { _id: '7', title: 'Vintage Denim Jacket', images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80'], price: 35, rating: 4.4, category: 'Vintage', sellerId: { username: 'RetroVibes' } },
    { _id: '8', title: 'Minimalist Linen Set', images: ['https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=500&q=80'], price: 30, rating: 4.3, category: 'Minimalist', sellerId: { username: 'SimpleLiving' } },
];

export default function Explore() {
    const [prompts, setPrompts] = useState<any[]>(MOCK_PROMPTS);
    const [loading, setLoading] = useState(false); // Set to true when real API is ready
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                setLoading(true);
                const res = await api.get('/prompts');
                if (res.data.success) {
                    setPrompts(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching prompts:', error);
                // Fallback to mock data if API fails (e.g. no backend running yet)
            } finally {
                setLoading(false);
            }
        };

        // Uncomment to use real API
        // fetchPrompts();
    }, []);

    const filteredPrompts = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || prompt.category === selectedCategory)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Explore Fashion Prompts</h1>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search styles, occasions..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Filter size={20} />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Categories Tabs */}
            <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
                {['All', 'Casual', 'Formal', 'Streetwear', 'Vintage', 'Business', 'Party', 'Sport', 'Minimalist'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedCategory === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100">
                            <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredPrompts.map((prompt) => (
                        <PromptCard
                            key={prompt._id}
                            id={prompt._id}
                            title={prompt.title}
                            image={prompt.images[0]}
                            price={prompt.price}
                            rating={prompt.rating}
                            seller={prompt.sellerId?.username || 'Unknown'}
                            sellerImage={prompt.sellerId?.photo}
                        />
                    ))}
                </div>
            )}

            {!loading && filteredPrompts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No prompts found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
