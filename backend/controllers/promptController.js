const Prompt = require('../models/Prompt');
const User = require('../models/User');

// @desc    Get all prompts
// @route   GET /api/v1/prompts
// @access  Public
const getPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find({ status: 'approved' }).populate('sellerId', 'username photo');
        res.status(200).json({
            success: true,
            count: prompts.length,
            data: prompts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get prompts by user (seller)
// @route   GET /api/v1/prompts/user/:userId
// @access  Public
const getUserPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find({ sellerId: req.params.userId });
        res.status(200).json({
            success: true,
            count: prompts.length,
            data: prompts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload a prompt
// @route   POST /api/v1/prompts/upload
// @access  Private (Seller)
const uploadPrompt = async (req, res) => {
    const { sellerId, title, description, images, category, gender, tags, price } = req.body;

    try {
        const prompt = new Prompt({
            sellerId,
            title,
            description,
            images,
            category,
            gender,
            tags,
            price
        });

        await prompt.save();

        res.status(201).json({
            success: true,
            data: prompt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a prompt
// @route   DELETE /api/v1/prompts/:id
// @access  Private (Seller/Admin)
const deletePrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);

        if (!prompt) {
            return res.status(404).json({ message: 'Prompt not found' });
        }

        await prompt.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPrompts,
    getUserPrompts,
    uploadPrompt,
    deletePrompt
};
