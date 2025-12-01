// This is a mock controller since we don't have actual PayPal credentials
// In a real app, this would interact with PayPal API

// @desc    Create payment intent (Mock)
// @route   POST /api/v1/payment/create
// @access  Private (Buyer)
const createPayment = async (req, res) => {
    const { amount } = req.body;

    try {
        // Mock response
        res.status(200).json({
            success: true,
            orderId: 'MOCK_PAYPAL_ORDER_ID_' + Date.now(),
            amount: amount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment
};
