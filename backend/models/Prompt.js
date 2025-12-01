const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String, // Cloudinary URLs
        required: true
    }],
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex', 'Kids'],
        required: true
    },
    tags: [String],
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prompt', promptSchema);
