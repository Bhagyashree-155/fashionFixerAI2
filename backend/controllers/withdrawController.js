const Withdraw = require('../models/Withdraw');
const Bank = require('../models/Bank');

// @desc    Request withdrawal
// @route   POST /api/v1/withdraw/request
// @access  Private (Seller)
const requestWithdraw = async (req, res) => {
    const { sellerId, amount, method } = req.body;

    try {
        const withdraw = new Withdraw({
            sellerId,
            amount,
            method
        });

        await withdraw.save();

        res.status(201).json({
            success: true,
            data: withdraw
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add withdrawal method (Bank)
// @route   POST /api/v1/withdraw/add-method
// @access  Private (Seller)
const addWithdrawMethod = async (req, res) => {
    const { sellerId, bankName, accountNumber, accountHolderName, ifscCode } = req.body;

    try {
        const bank = new Bank({
            sellerId,
            bankName,
            accountNumber,
            accountHolderName,
            ifscCode
        });

        await bank.save();

        res.status(201).json({
            success: true,
            data: bank
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete withdrawal method
// @route   DELETE /api/v1/withdraw/delete-method/:id
// @access  Private (Seller)
const deleteWithdrawMethod = async (req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);

        if (!bank) {
            return res.status(404).json({ message: 'Method not found' });
        }

        await bank.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    requestWithdraw,
    addWithdrawMethod,
    deleteWithdrawMethod
};
