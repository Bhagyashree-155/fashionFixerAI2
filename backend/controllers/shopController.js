const Shop = require('../models/Shop');
const Prompt = require('../models/Prompt');

// @desc    Create a shop
// @route   POST /api/v1/shop/create
// @access  Private (Seller)
const createShop = async (req, res) => {
    const { sellerId, name, description, logo, banner } = req.body;

    try {
        let shop = await Shop.findOne({ sellerId });

        if (shop) {
            return res.status(400).json({ message: 'Shop already exists for this seller' });
        }

        shop = new Shop({
            sellerId,
            name,
            description,
            logo,
            banner
        });

        await shop.save();

        res.status(201).json({
            success: true,
            data: shop
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get shop by ID
// @route   GET /api/v1/shop/:id
// @access  Public
const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate('sellerId', 'username photo');

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json({
            success: true,
            data: shop
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get top shops (by sales)
// @route   GET /api/v1/shop/top
// @access  Public
const getTopShops = async (req, res) => {
    try {
        const shops = await Shop.find().sort({ totalSales: -1 }).limit(10);
        res.status(200).json({
            success: true,
            count: shops.length,
            data: shops
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get prompts for a shop
// @route   GET /api/v1/shop/:id/prompts
// @access  Public
const getShopPrompts = async (req, res) => {
    try {
        // First find the shop to get the sellerId
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const prompts = await Prompt.find({ sellerId: shop.sellerId, status: 'approved' });
        res.status(200).json({
            success: true,
            count: prompts.length,
            data: prompts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createShop,
    getShopById,
    getTopShops,
    getShopPrompts
};
