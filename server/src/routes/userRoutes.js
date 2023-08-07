const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/users', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userData = await userService.getUserWithTotalBorrowedBooks(userId);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
