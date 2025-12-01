const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getShopOrders } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/shop/:sellerId', getShopOrders);

module.exports = router;
