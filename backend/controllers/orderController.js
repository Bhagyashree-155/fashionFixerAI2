const Order = require('../models/Order');
const Shop = require('../models/Shop');

// @desc    Create new order
// @route   POST /api/v1/order
// @access  Private (Buyer)
// @desc    Create new order
// @route   POST /api/v1/order
// @access  Private (Buyer)
const createOrder = async (req, res) => {
    const { buyerId, items, shippingAddress, totalAmount, paymentMethod, paymentId } = req.body;

    try {
        const order = new Order({
            buyerId,
            items,
            shippingAddress,
            totalAmount,
            paymentMethod,
            paymentId,
            status: 'completed' // Assuming payment is successful for now
        });

        await order.save();

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders (Buyer)
// @route   GET /api/v1/order/user/:userId
// @access  Private (Buyer)
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyerId: req.params.userId })
            .populate('promptId')
            .populate('sellerId', 'username');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get shop orders (Seller)
// @route   GET /api/v1/order/shop/:sellerId
// @access  Private (Seller)
const getShopOrders = async (req, res) => {
    try {
        const orders = await Order.find({ sellerId: req.params.sellerId })
            .populate('promptId')
            .populate('buyerId', 'username email');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getShopOrders
};
