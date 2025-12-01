import Link from 'next/link';
import { Star } from 'lucide-react';

interface PromptCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    rating: number;
    seller: string;
    sellerImage?: string;
}

const PromptCard = ({ id, title, image, price, rating, seller, sellerImage }: PromptCardProps) => {
    return (
        <Link href={`/prompt/${id}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 relative overflow-hidden">
                    {/* In a real app, use Next.js Image component */}
                    <img
                        src={image || "https://via.placeholder.com/400x500"}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900">
                        ${price}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{title}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {sellerImage ? (
                                <img src={sellerImage} alt={seller} className="w-6 h-6 rounded-full" />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-bold">
                                    {seller.charAt(0)}
                                </div>
                            )}
                            <span className="text-sm text-gray-600 truncate max-w-[100px]">{seller}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                            <Star size={14} fill="currentColor" />
                            <span>{rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PromptCard;
