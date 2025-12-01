const express = require('express');
const router = express.Router();
const {
    analyzeAndRecommend,
    getUserRecommendations,
    getLatestRecommendation
} = require('../controllers/recommendationController');

// POST - Analyze image and get recommendations
router.post('/analyze', analyzeAndRecommend);

// GET - Get user's recommendation history
router.get('/user/:userId', getUserRecommendations);

// GET - Get latest recommendation for user
router.get('/latest/:userId', getLatestRecommendation);

module.exports = router;
