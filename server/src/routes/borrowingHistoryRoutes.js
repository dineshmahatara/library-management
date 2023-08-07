const express = require('express');
const router = express.Router();
const borrowingHistoryController = require('../controllers/borrowingHistoryController');
const borrowingHistoryService = require('../services/borrowingHistoryService');

router.post('/borrow', async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const result = await borrowingHistoryController.borrowBook(userId, bookId);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/return', async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const result = await borrowingHistoryService.returnBook(userId, bookId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
