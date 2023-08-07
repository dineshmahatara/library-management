const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');

router.post('/books', async (req, res) => {
    console.log(req.body)
    try {
        const newBook = await bookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        // Check if the error message is related to duplicate ISBN
        if (error.message.includes('This ISBN is already registered')) {
            res.status(400).json({ error: 'Book with this ISBN is already registered' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

router.post('/borrow', async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const result = await bookService.borrowBook(userId, bookId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/books', async (req, res) => {
    try {
        const allBooks = await bookService.getAllBooks();
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedBook = await bookService.updateBook(bookId, updatedData);

        if (updatedBook) {
            res.status(200).json({ message: "Book Updated", updatedBook });
        } else {
            res.status(200).json({ message: "You changed nothing" });
        }
    } catch (error) {
        // Handle potential errors
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
