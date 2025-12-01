const express = require('express');
const router = express.Router();
const { createShop, getShopById, getTopShops, getShopPrompts } = require('../controllers/shopController');

router.post('/create', createShop);
router.get('/top', getTopShops);
router.get('/:id', getShopById);
router.get('/:id/prompts', getShopPrompts);

module.exports = router;
