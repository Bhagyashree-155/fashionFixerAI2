const express = require('express');
const router = express.Router();
const { requestWithdraw, addWithdrawMethod, deleteWithdrawMethod } = require('../controllers/withdrawController');

router.post('/request', requestWithdraw);
router.post('/add-method', addWithdrawMethod);
router.delete('/delete-method/:id', deleteWithdrawMethod);

module.exports = router;
