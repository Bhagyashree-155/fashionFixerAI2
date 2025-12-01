const User = require('../models/User');

// @desc    Register a new user (or sync from Clerk)
// @route   POST /api/v1/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { clerkId, email, username, photo } = req.body;

    try {
        let user = await User.findOne({ clerkId });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            clerkId,
            email,
            username,
            photo
        });

        await user.save();

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user (Get user profile by Clerk ID)
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { clerkId } = req.body;

    try {
        const user = await User.findOne({ clerkId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Sync user from Clerk (Create if not exists, else return)
// @route   POST /api/v1/auth/sync
// @access  Public
const syncUser = async (req, res) => {
    const { clerkId, email, username, photo } = req.body;

    try {
        let user = await User.findOne({ clerkId });

        if (!user) {
            user = new User({
                clerkId,
                email,
                username,
                photo
            });
            await user.save();
            return res.status(201).json({
                success: true,
                data: user,
                message: 'User created'
            });
        }

        // Optional: Update user details if they changed
        // user.email = email;
        // user.username = username;
        // user.photo = photo;
        // await user.save();

        res.status(200).json({
            success: true,
            data: user,
            message: 'User synced'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    syncUser
};
