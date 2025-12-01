const express = require('express');
const router = express.Router();
const { getPrompts, getUserPrompts, uploadPrompt, deletePrompt } = require('../controllers/promptController');

router.get('/', getPrompts);
router.get('/user/:userId', getUserPrompts);
router.post('/upload', uploadPrompt);
router.delete('/:id', deletePrompt);

module.exports = router;
