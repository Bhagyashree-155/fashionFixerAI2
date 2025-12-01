'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Preferences() {
    const [preferences, setPreferences] = useState({
        styles: ['Casual', 'Minimalist'],
        colors: ['Black', 'White', 'Navy'],
        sizes: { top: 'M', bottom: '32' }
    });

    const handleSave = () => {
        // Call API to save preferences
        toast.success('Preferences saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Fashion Preferences</h1>

                <div className="space-y-8">
                    {/* Style Preferences */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Favorite Styles</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Casual', 'Formal', 'Streetwear', 'Vintage', 'Boho', 'Minimalist', 'Sporty'].map((style) => (
                                <button
                                    key={style}
                                    onClick={() => {
                                        const newStyles = preferences.styles.includes(style)
                                            ? preferences.styles.filter(s => s !== style)
                                            : [...preferences.styles, style];
                                        setPreferences({ ...preferences, styles: newStyles });
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${preferences.styles.includes(style)
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Preferences */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Preferred Colors</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Black', 'White', 'Navy', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Beige'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        const newColors = preferences.colors.includes(color)
                                            ? preferences.colors.filter(c => c !== color)
                                            : [...preferences.colors, color];
                                        setPreferences({ ...preferences, colors: newColors });
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${preferences.colors.includes(color)
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={handleSave}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center gap-2"
                        >
                            <Save size={20} />
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
