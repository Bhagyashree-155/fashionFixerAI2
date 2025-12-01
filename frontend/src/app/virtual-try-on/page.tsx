'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { FaArrowLeft, FaCloudUploadAlt, FaMagic, FaTimes } from 'react-icons/fa';

export default function VirtualTryOn() {
    const [activeTab, setActiveTab] = useState<'upload' | 'model'>('model');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false); // Track if the current image is uploaded or generated

    // Form State
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bodyType, setBodyType] = useState('Hourglass');
    const [skinTone, setSkinTone] = useState('Medium');
    const [hairColor, setHairColor] = useState('Brown');
    const [hairLength, setHairLength] = useState('Medium');

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setIsUploaded(false);

        // Enhanced logic to select different images based on input
        // Available images: new-1.png (Black hair), new-2.jpg (Blonde), new-3.jpg (Brown/Pear), new-4.jpg (Red), new-5.jpg (Brown/Hourglass)
        let selectedImage = "/images/shop/new-5.jpg"; // Default (Brown, Hourglass)

        if (hairColor === 'Blonde') {
            selectedImage = "/images/shop/new-2.jpg";
        } else if (hairColor === 'Black') {
            selectedImage = "/images/shop/new-1.png";
        } else if (hairColor === 'Red') {
            selectedImage = "/images/shop/new-4.jpg";
        } else if (hairColor === 'Brown') {
            if (bodyType === 'Pear' || bodyType === 'Rectangle') {
                selectedImage = "/images/shop/new-3.jpg";
            } else {
                selectedImage = "/images/shop/new-5.jpg";
            }
        } else {
            // Fallback for other combinations (e.g. if we added more colors)
            if (skinTone === 'Light') {
                selectedImage = "/images/shop/new-2.jpg";
            } else {
                selectedImage = "/images/shop/new-5.jpg";
            }
        }

        // Simulate AI generation delay
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedImage(selectedImage);
        }, 2000);
    };

    const handleUseUploadedPhoto = () => {
        if (previewUrl) {
            setGeneratedImage(previewUrl);
            setIsUploaded(true);
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Try-On</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            See how outfits look on you with our AI-powered virtual try-on technology before you buy.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-dark-card p-1 rounded-lg border border-gray-800 inline-flex">
                        <button
                            onClick={() => { setActiveTab('upload'); setGeneratedImage(null); }}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'upload'
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Upload Your Photo
                        </button>
                        <button
                            onClick={() => { setActiveTab('model'); setGeneratedImage(null); }}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'model'
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Use Virtual Model
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-dark-card rounded-2xl p-8 border border-gray-800">
                    {generatedImage ? (
                        <div className="text-center animate-fade-in">
                            <h2 className="text-2xl font-bold mb-6">
                                {isUploaded ? "Your Photo is Ready!" : "Your Virtual Model is Ready!"}
                            </h2>
                            <div className="relative max-w-sm mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                                <img src={generatedImage} alt="Virtual Try-On Result" className="w-full h-auto" />
                            </div>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setGeneratedImage(null)}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
                                >
                                    {isUploaded ? "Upload Different Photo" : "Create New Model"}
                                </button>
                                <Link href="/shop">
                                    <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md transition-colors">
                                        Try On Clothes
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'upload' ? (
                                <div className="flex flex-col items-center text-center py-12">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                        <FaCloudUploadAlt size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">Upload Your Photo</h2>
                                    <p className="text-gray-400 mb-8 max-w-md">
                                        Upload a full-body photo of yourself to see how the clothes fit on your actual body.
                                    </p>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    {previewUrl ? (
                                        <div className="flex flex-col items-center gap-4 mb-6">
                                            <div className="relative">
                                                <img src={previewUrl} alt="Preview" className="max-h-[300px] rounded-lg shadow-lg" />
                                                <button
                                                    onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleUseUploadedPhoto}
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                                            >
                                                <FaMagic /> Use This Photo for Try-On
                                            </button>
                                        </div>
                                    ) : null}

                                    <button
                                        onClick={triggerFileInput}
                                        className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-medium transition-colors"
                                    >
                                        {previewUrl ? 'Change Photo' : 'Select Photo'}
                                    </button>
                                </div>
                            ) : (
                                <div className="max-w-2xl mx-auto">
                                    <div className="text-center mb-8">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                                            <FaMagic size={24} />
                                        </div>
                                        <h2 className="text-xl font-bold">Use Virtual Model</h2>
                                        <p className="text-gray-400 text-sm mt-2">
                                            Create a virtual model with your measurements and see how outfits look on a body similar to yours.
                                        </p>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleGenerate}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Height & Weight */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-medium text-white">Body Measurements</h3>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Height (cm)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="175"
                                                        value={height}
                                                        onChange={(e) => setHeight(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Weight (kg)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="70"
                                                        value={weight}
                                                        onChange={(e) => setWeight(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Body Type</label>
                                                    <select
                                                        value={bodyType}
                                                        onChange={(e) => setBodyType(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                    >
                                                        <option value="Hourglass">Hourglass</option>
                                                        <option value="Pear">Pear</option>
                                                        <option value="Rectangle">Rectangle</option>
                                                        <option value="Inverted Triangle">Inverted Triangle</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Appearance */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-medium text-white">Appearance</h3>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Skin Tone</label>
                                                    <select
                                                        value={skinTone}
                                                        onChange={(e) => setSkinTone(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                    >
                                                        <option value="Light">Light</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Dark">Dark</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Hair Color</label>
                                                    <select
                                                        value={hairColor}
                                                        onChange={(e) => setHairColor(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                    >
                                                        <option value="Black">Black</option>
                                                        <option value="Brown">Brown</option>
                                                        <option value="Blonde">Blonde</option>
                                                        <option value="Red">Red</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Hair Length</label>
                                                    <select
                                                        value={hairLength}
                                                        onChange={(e) => setHairLength(e.target.value)}
                                                        className="w-full bg-dark-input border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                                    >
                                                        <option value="Short">Short</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Long">Long</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isGenerating}
                                                className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Generating Model...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaMagic /> Create Virtual Model
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
