'use client';

import Link from "next/link";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import toast from 'react-hot-toast';

const products = [
    {
        id: 1,
        name: "Classic White Tee",
        price: 29.99,
        rating: 4.5,
        image: "/images/shop/white-tee.jpg"
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 89.99,
        rating: 4.8,
        image: "/images/shop/denim-jacket.jpg"
    },
    {
        id: 3,
        name: "Summer Dress",
        price: 59.99,
        rating: 4.7,
        image: "/images/shop/new-5.jpg"
    },
    {
        id: 4,
        name: "Leather Boots",
        price: 129.99,
        rating: 4.9,
        image: "/images/shop/new-4.jpg"
    },
    {
        id: 5,
        name: "Casual Jeans",
        price: 49.99,
        rating: 4.4,
        image: "/images/shop/new-2.jpg"
    },
    {
        id: 6,
        name: "Silk Scarf",
        price: 34.99,
        rating: 4.6,
        image: "/images/shop/product-2.png"
    },
    {
        id: 7,
        name: "Stylish Jeans",
        price: 54.99,
        rating: 4.7,
        image: "/images/shop/new-1.png"
    },
    {
        id: 8,
        name: "Modern Denim",
        price: 64.99,
        rating: 4.6,
        image: "/images/shop/new-2.jpg"
    },
    {
        id: 9,
        name: "Classic Boots",
        price: 119.99,
        rating: 4.8,
        image: "/images/shop/new-3.jpg"
    },
    {
        id: 10,
        name: "Floral Dress",
        price: 69.99,
        rating: 4.9,
        image: "/images/shop/new-4.jpg"
    },
    {
        id: 11,
        name: "Graphic Tee",
        price: 24.99,
        rating: 4.3,
        image: "/images/shop/new-5.jpg"
    }
];

export default function Shop() {
    const { addToCart } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`Added ${product.name} to cart!`);
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Shop Latest Trends</h1>
                    <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-white">Filter</button>
                        <button className="text-gray-400 hover:text-white">Sort</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-dark-card rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all group">
                            <div className="aspect-[3/4] bg-gray-800 relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform hover:bg-primary-hover"
                                >
                                    <FaShoppingBag />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-white truncate">{product.name}</h3>
                                    <span className="text-primary font-bold">${product.price}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-400">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span>{product.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
