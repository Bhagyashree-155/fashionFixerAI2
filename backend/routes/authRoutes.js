const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, syncUser } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/sync', syncUser);
router.get('/users', getUsers);

module.exports = router;
