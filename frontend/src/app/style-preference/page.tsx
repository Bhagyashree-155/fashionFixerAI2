'use client';

import { useState } from 'react';

export default function StylePreference() {
    const [occasion, setOccasion] = useState('');
    const [style, setStyle] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [details, setDetails] = useState('');

    const handleColorChange = (color: string) => {
        if (colors.includes(color)) {
            setColors(colors.filter(c => c !== color));
        } else {
            setColors([...colors, color]);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8 bg-dark-card p-8 rounded-xl border border-gray-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Or Describe Your Style Preferences</h2>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Occasion */}
                        <div>
                            <label htmlFor="occasion" className="block text-sm font-medium text-gray-300 mb-2">
                                What's the occasion?
                            </label>
                            <select
                                id="occasion"
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                className="block w-full px-3 py-3 bg-dark-input border border-gray-700 rounded-md text-white focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="" disabled>Select an occasion</option>
                                <option value="casual">Casual</option>
                                <option value="formal">Formal</option>
                                <option value="party">Party</option>
                                <option value="work">Work</option>
                                <option value="wedding">Wedding</option>
                            </select>
                        </div>

                        {/* Style */}
                        <div>
                            <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
                                What style do you prefer?
                            </label>
                            <select
                                id="style"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="block w-full px-3 py-3 bg-dark-input border border-gray-700 rounded-md text-white focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="" disabled>Select a style</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="bohemian">Bohemian</option>
                                <option value="streetwear">Streetwear</option>
                                <option value="classic">Classic</option>
                                <option value="vintage">Vintage</option>
                            </select>
                        </div>

                        {/* Color Preferences */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-4">
                                Color preferences
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Pink'].map((color) => (
                                    <div key={color} className="flex items-center">
                                        <input
                                            id={`color-${color}`}
                                            type="checkbox"
                                            checked={colors.includes(color)}
                                            onChange={() => handleColorChange(color)}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded bg-dark-input"
                                        />
                                        <label htmlFor={`color-${color}`} className="ml-2 block text-sm text-gray-300">
                                            {color}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">
                                Additional details (optional)
                            </label>
                            <textarea
                                id="details"
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Describe any specific preferences or requirements..."
                                className="block w-full px-3 py-3 bg-dark-input border border-gray-700 rounded-md text-white placeholder-gray-500 focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                ✨ Generate Style Suggestions
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
