const Recommendation = require('../models/Recommendation');
const Prompt = require('../models/Prompt');
const User = require('../models/User');

// Mock AI function to analyze image and extract preferences
// In production, this would call an actual AI service (OpenAI Vision, Google Cloud Vision, etc.)
const analyzeImageForStyle = (imageData) => {
    // Mock analysis - returns style preferences
    // In a real implementation, this would use computer vision AI
    const mockStyles = ['casual', 'modern', 'trendy', 'comfortable'];
    const mockColors = ['blue', 'black', 'white', 'gray', 'navy'];
    const mockCategories = ['T-Shirts', 'Jeans', 'Sneakers', 'Jackets', 'Hoodies'];

    return {
        style: mockStyles.slice(0, Math.floor(Math.random() * 3) + 2),
        colors: mockColors.slice(0, Math.floor(Math.random() * 3) + 2),
        preferredCategories: mockCategories.slice(0, Math.floor(Math.random() * 3) + 2)
    };
};

// Fallback mock products when database is empty
const getMockProducts = () => {
    return [
        {
            _id: 'mock1',
            title: 'Classic Navy T-Shirt',
            description: 'Comfortable cotton t-shirt in navy blue',
            images: ['/images/shop/white-tee.jpg'],
            category: 'T-Shirts',
            gender: 'Unisex',
            tags: ['casual', 'comfortable', 'blue', 'navy'],
            price: 29.99,
            rating: 4.5
        },
        {
            _id: 'mock2',
            title: 'Modern Denim Jacket',
            description: 'Trendy denim jacket for casual wear',
            images: ['/images/shop/denim-jacket.jpg'],
            category: 'Jackets',
            gender: 'Unisex',
            tags: ['casual', 'trendy', 'blue', 'denim'],
            price: 89.99,
            rating: 4.8
        },
        {
            _id: 'mock3',
            title: 'Comfortable Black Jeans',
            description: 'Modern fit jeans in classic black',
            images: ['/images/shop/new-2.jpg'],
            category: 'Jeans',
            gender: 'Unisex',
            tags: ['casual', 'black', 'comfortable', 'modern'],
            price: 54.99,
            rating: 4.7
        },
        {
            _id: 'mock4',
            title: 'Stylish Sneakers',
            description: 'White sneakers perfect for everyday wear',
            images: ['/images/shop/new-3.jpg'],
            category: 'Sneakers',
            gender: 'Unisex',
            tags: ['casual', 'white', 'comfortable', 'trendy'],
            price: 79.99,
            rating: 4.6
        },
        {
            _id: 'mock5',
            title: 'Casual Gray Hoodie',
            description: 'Cozy hoodie for a relaxed look',
            images: ['/images/shop/new-4.jpg'],
            category: 'Hoodies',
            gender: 'Unisex',
            tags: ['casual', 'gray', 'comfortable', 'cozy'],
            price: 49.99,
            rating: 4.4
        },
        {
            _id: 'mock6',
            title: 'Modern White Sneakers',
            description: 'Clean white sneakers for any outfit',
            images: ['/images/shop/new-5.jpg'],
            category: 'Sneakers',
            gender: 'Unisex',
            tags: ['modern', 'white', 'trendy', 'versatile'],
            price: 69.99,
            rating: 4.5
        },
        {
            _id: 'mock7',
            title: 'Navy Blue Jacket',
            description: 'Stylish navy jacket for cooler days',
            images: ['/images/shop/product-2.png'],
            category: 'Jackets',
            gender: 'Unisex',
            tags: ['modern', 'navy', 'blue', 'stylish'],
            price: 99.99,
            rating: 4.7
        },
        {
            _id: 'mock8',
            title: 'Black Casual T-Shirt',
            description: 'Essential black tee for your wardrobe',
            images: ['/images/shop/new-1.png'],
            category: 'T-Shirts',
            gender: 'Unisex',
            tags: ['casual', 'black', 'essential', 'comfortable'],
            price: 24.99,
            rating: 4.3
        }
    ];
};

// Function to find matching products based on preferences
const findMatchingProducts = async (preferences) => {
    try {
        // Try to query products from database (Prompt model = products in this system)
        let products = await Prompt.find({
            status: 'approved',  // Only show approved products
            $or: [
                { category: { $in: preferences.preferredCategories } },
                { tags: { $in: [...preferences.style, ...preferences.colors] } }
            ]
        }).limit(12);

        // If database is empty, use mock data
        if (!products || products.length === 0) {
            console.log('Database is empty, using mock product data');
            products = getMockProducts();
        }

        // Calculate simple relevance scores
        const scoredProducts = products.map(product => {
            let score = 0;

            // Check category match
            if (preferences.preferredCategories.includes(product.category)) {
                score += 30;
            }

            // Check style/color tags match
            const productTags = product.tags || [];
            preferences.style.forEach(style => {
                if (productTags.some(tag => tag.toLowerCase().includes(style.toLowerCase()))) {
                    score += 20;
                }
            });

            preferences.colors.forEach(color => {
                if (productTags.some(tag => tag.toLowerCase().includes(color.toLowerCase())) ||
                    (product.title && product.title.toLowerCase().includes(color.toLowerCase()))) {
                    score += 15;
                }
            });

            // Boost higher rated products
            score += product.rating * 5;

            // Cap score at 100
            score = Math.min(score, 100);

            return {
                productId: product._id,
                score: score,
                product: product  // Include full product for mock data
            };
        });

        // Sort by score and return top results
        return scoredProducts.sort((a, b) => b.score - a.score).slice(0, 8);
    } catch (error) {
        console.error('Error finding matching products:', error);
        return [];
    }
};

// @desc    Analyze image and generate recommendations
// @route   POST /api/v1/recommendations/analyze
// @access  Private
const analyzeAndRecommend = async (req, res) => {
    const { userId, imageData } = req.body;

    if (!userId || !imageData) {
        return res.status(400).json({
            success: false,
            message: 'User ID and image data are required'
        });
    }

    try {
        // Step 1: Analyze image to extract style preferences
        const extractedPreferences = analyzeImageForStyle(imageData);

        // Step 2: Find matching products
        const recommendedProducts = await findMatchingProducts(extractedPreferences);

        // For mock data, directly return the products since they're not in DB
        const recommendations = recommendedProducts.map(item => ({
            product: item.product || item.productId,
            relevanceScore: item.score
        }));

        res.status(201).json({
            success: true,
            data: {
                preferences: extractedPreferences,
                recommendations: recommendations
            }
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's recommendation history
// @route   GET /api/v1/recommendations/user/:userId
// @access  Private
const getUserRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.find({
            userId: req.params.userId
        })
            .populate('recommendedProducts.productId')
            .sort({ generatedAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: recommendations.length,
            data: recommendations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get latest recommendations for quick access
// @route   GET /api/v1/recommendations/latest/:userId
// @access  Private
const getLatestRecommendation = async (req, res) => {
    try {
        const recommendation = await Recommendation.findOne({
            userId: req.params.userId
        })
            .populate('recommendedProducts.productId')
            .sort({ generatedAt: -1 });

        if (!recommendation) {
            return res.status(404).json({
                success: false,
                message: 'No recommendations found'
            });
        }

        res.status(200).json({
            success: true,
            data: recommendation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    analyzeAndRecommend,
    getUserRecommendations,
    getLatestRecommendation
};
