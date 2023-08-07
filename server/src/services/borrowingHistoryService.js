// borrowingHistoryService.js
const BorrowingHistory = require('../models/borrowingHistoryModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

exports.returnBook = async (userId, bookId) => {
    try {
        // Find the borrowing history entry for the specified user and book
        const borrowingHistory = await BorrowingHistory.findOne({
            user: userId,
            book: bookId,
            return_date: null // Assuming return_date is null for borrowed books
        });

        if (!borrowingHistory) {
            throw new Error("Book not found in borrowing history or already returned.");
        }

        // Update the borrowing history entry with the return date
        borrowingHistory.return_date = new Date();
        await borrowingHistory.save();

        // Find the book and increment the copies_available
        const book = await Book.findById(bookId);
        book.copies_available += 1;
        await book.save();

        // Update the user's borrowed_books array by removing the returned book
        const user = await User.findById(userId);
        user.borrowed_books = user.borrowed_books.filter(b => b.toString() !== bookId);
        await user.save();

        return borrowingHistory;
    } catch (error) {
        throw error;
    }
};
