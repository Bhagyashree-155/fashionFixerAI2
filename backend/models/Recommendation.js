const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadedImage: {
        type: String, // Base64 or URL of uploaded image
        required: true
    },
    extractedPreferences: {
        style: [String], // e.g., ['casual', 'sporty', 'formal']
        colors: [String], // e.g., ['blue', 'black', 'white']
        preferredCategories: [String] // e.g., ['Shirts', 'Jeans', 'Sneakers']
    },
    recommendedProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop'
        },
        score: {
            type: Number,
            default: 0
        }
    }],
    recommendedPrompts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt'
    }],
    generatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
