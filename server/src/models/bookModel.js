const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    publication_year: Number,
    genre: String,
    copies_available: Number,
    total_copies: Number,
    borrowed_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    schoolId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
