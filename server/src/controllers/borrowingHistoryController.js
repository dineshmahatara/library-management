const BorrowingHistory = require('../models/borrowingHistoryModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

exports.borrowBook = async (userId, bookId) => {
    try {
        // Find the book
        const book = await Book.findById(bookId);

        // Check if the book exists and has available copies
        if (!book || book.copies_available === 0) {
            throw new Error("Book not available for borrowing");
        }

        // Check if the user has already borrowed a book with the same ISBN
        const user = await User.findById(userId);
        const hasBorrowedSameISBN = user.borrowed_books.some(borrowedBookId => {
            return borrowedBookId.equals(bookId);
        });

        if (hasBorrowedSameISBN) {
            throw new Error("You have already borrowed a book with the same ISBN.");
        }

        // Create a new borrowing history entry
        const newBorrowingHistory = new BorrowingHistory({
            user: userId,
            book: bookId,
            borrow_date: new Date()
        });
        const savedHistory = await newBorrowingHistory.save();

        // Update the book's copies_available field and push the user ID to borrowed_by
        book.copies_available -= 1;
        book.borrowed_by.push(userId);
        await book.save();

        // Update the user's borrowed_books array
        user.borrowed_books.push(bookId);
        await user.save();

        return savedHistory;
    } catch (error) {
        throw error;
    }
};
