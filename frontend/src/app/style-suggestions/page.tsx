'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaCloudUploadAlt, FaCamera, FaTimes, FaCheck, FaStar, FaShoppingBag, FaSpinner } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    rating: number;
    category: string;
}

interface Recommendation {
    product: Product;
    relevanceScore: number;
}

export default function StyleSuggestions() {
    const { user } = useUser();
    const { addToCart } = useCart();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [preferences, setPreferences] = useState<any>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size exceeds 10MB limit');
                return;
            }
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setCapturedImage(null);
            setRecommendations([]); // Clear previous recommendations
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        const initCamera = async () => {
            if (isCameraOpen) {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    currentStream = mediaStream;
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    alert("Could not access camera. Please ensure you have granted permission.");
                    setIsCameraOpen(false);
                }
            }
        };

        if (isCameraOpen) {
            initCamera();
        }

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraOpen]);

    // Re-attach stream if video ref changes (e.g. re-renders)
    useEffect(() => {
        if (isCameraOpen && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [isCameraOpen, stream]);

    const startCamera = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setRecommendations([]);
        setIsCameraOpen(true);
    };

    const stopCamera = () => {
        setIsCameraOpen(false);
        setStream(null);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageUrl);
                stopCamera();
            }
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        setRecommendations([]);
        startCamera();
    };

    const getRecommendations = async () => {
        if (!user) {
            toast.error('Please sign in to get recommendations');
            return;
        }

        const imageData = capturedImage || previewUrl;
        if (!imageData) {
            toast.error('Please upload or capture a photo first');
            return;
        }

        setIsLoading(true);
        setRecommendations([]);

        try {
            // Convert image to base64 if it's a File
            let base64Image = imageData;
            if (selectedFile) {
                base64Image = await fileToBase64(selectedFile);
            }

            const response = await fetch('http://localhost:5000/api/v1/recommendations/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    imageData: base64Image
                })
            });

            const data = await response.json();

            if (data.success) {
                setRecommendations(data.data.recommendations);
                setPreferences(data.data.preferences);
                toast.success('AI recommendations generated!');
            } else {
                toast.error(data.message || 'Failed to generate recommendations');
            }
        } catch (error) {
            console.error('Error getting recommendations:', error);
            toast.error('Failed to generate recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0] || '/images/placeholder.jpg'
        });
        toast.success(`Added ${product.name} to cart!`);
    };

    const hasImage = previewUrl || capturedImage;

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Style Suggestions</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Upload your photos or describe your preferences, and our AI will recommend personalized outfits that match your style.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    {/* Upload Section */}
                    <div className="bg-dark-card rounded-2xl p-8 border border-gray-800 flex flex-col items-center text-center hover:border-primary/50 transition-colors relative">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                            <FaCloudUploadAlt size={32} />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Upload Photos</h2>
                        <p className="text-gray-400 mb-8 text-sm">
                            Upload photos of yourself or outfits you like.
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div
                            onClick={triggerFileInput}
                            className="w-full border-2 border-dashed border-gray-700 rounded-xl p-8 mb-6 hover:border-primary/50 transition-colors cursor-pointer bg-dark-bg/50 flex flex-col items-center justify-center min-h-[200px]"
                        >
                            {previewUrl ? (
                                <div className="relative w-full h-full">
                                    <img src={previewUrl} alt="Preview" className="max-h-[180px] mx-auto rounded-md object-contain" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setSelectedFile(null); setRecommendations([]); }}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <FaCloudUploadAlt className="text-gray-500 mb-4" size={40} />
                                    <p className="text-gray-300 font-medium mb-2">Click or drag photos here</p>
                                    <p className="text-gray-500 text-xs">Supports JPG, PNG (max 10MB)</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={triggerFileInput}
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
                        >
                            Select Files
                        </button>
                    </div>

                    {/* Camera Section */}
                    <div className="bg-dark-card rounded-2xl p-8 border border-gray-800 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                            <FaCamera size={32} />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Take a Photo</h2>
                        <p className="text-gray-400 mb-8 text-sm">
                            Use your camera to get instant style recommendations.
                        </p>

                        <div className="w-full aspect-video bg-dark-bg/50 rounded-xl border border-gray-700 flex items-center justify-center mb-6 relative overflow-hidden">
                            {isCameraOpen ? (
                                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            ) : capturedImage ? (
                                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <FaCamera className="text-gray-600 mb-4" size={40} />
                                    <p className="text-gray-500 text-sm">Camera preview will appear here</p>
                                </div>
                            )}
                            <canvas ref={canvasRef} className="hidden" />
                        </div>

                        {isCameraOpen ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={capturePhoto}
                                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-medium transition-colors"
                                >
                                    Capture
                                </button>
                                <button
                                    onClick={stopCamera}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : capturedImage ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={retakePhoto}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                                >
                                    Retake
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={startCamera}
                                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
                            >
                                Access Camera
                            </button>
                        )}
                    </div>
                </div>

                {/* Get Recommendations Button */}
                {hasImage && !isLoading && recommendations.length === 0 && (
                    <div className="text-center mb-12">
                        <button
                            onClick={getRecommendations}
                            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                            ✨ Get AI Recommendations
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center mb-12">
                        <div className="inline-block">
                            <FaSpinner className="animate-spin text-primary text-5xl mb-4" />
                            <p className="text-gray-400 text-lg">Analyzing your style...</p>
                            <p className="text-gray-500 text-sm mt-2">Our AI is finding the perfect outfits for you</p>
                        </div>
                    </div>
                )}

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <div className="mt-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">🎨 Your Personalized Recommendations</h2>
                            {preferences && (
                                <div className="text-gray-400 mb-4">
                                    <p className="mb-2">Based on your style, we detected:</p>
                                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                                        {preferences.style?.map((s: string, i: number) => (
                                            <span key={i} className="bg-primary/20 text-primary px-3 py-1 rounded-full">
                                                {s}
                                            </span>
                                        ))}
                                        {preferences.colors?.map((c: string, i: number) => (
                                            <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {recommendations.map((rec, index) => (
                                <div key={rec.product._id} className="bg-dark-card rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all group relative">
                                    {/* Relevance Badge */}
                                    <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full z-10 font-bold">
                                        {Math.round(rec.relevanceScore)}% Match
                                    </div>

                                    <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden">
                                        <img
                                            src={rec.product.images?.[0] || '/images/placeholder.jpg'}
                                            alt={rec.product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <button
                                            onClick={() => handleAddToCart(rec.product)}
                                            className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform hover:bg-primary-hover"
                                        >
                                            <FaShoppingBag />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-white truncate">{rec.product.name}</h3>
                                            <span className="text-primary font-bold">${rec.product.price}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                <span>{rec.product.rating}</span>
                                            </div>
                                            <span className="text-xs">{rec.product.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Try Again Button */}
                        <div className="text-center mt-8">
                            <button
                                onClick={() => {
                                    setRecommendations([]);
                                    setPreferences(null);
                                    setPreviewUrl(null);
                                    setCapturedImage(null);
                                    setSelectedFile(null);
                                }}
                                className="text-gray-400 hover:text-white transition-colors underline"
                            >
                                Try with a different photo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
