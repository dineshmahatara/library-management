const Book = require('../models/bookModel');
const User = require('../models/userModel');
const BorrowingHistory = require('../models/borrowingHistoryModel'); // Import the BorrowingHistory model




exports.createBook = async (bookData) => {
    try {
        // Check if the same book with the same ISBN already exists in the same school
        const existingBookWithSameISBNInSchool = await Book.findOne({
            isbn: bookData.isbn,
            schoolId: bookData.schoolId
        });

        if (existingBookWithSameISBNInSchool) {
            throw new Error('A book with the same ISBN already exists in the same school.');
        }

        const newBook = new Book(bookData);
        return await newBook.save();
    } catch (error) {
        throw error;
    }
};


exports.countBooksByISBN = async (isbn) => {
    
    try {
        const bookCounts = await Book.aggregate([
            {
                $match: { isbn: isbn }
            },
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: 1 }
                }
            }
        ]);

        if (bookCounts.length > 0) {
            return bookCounts[0].totalBooks;
        } else {
            return 0;
        }
    } catch (error) {
        throw error;
    }
};

// exports.borrowBook = async (userId, bookId) => {
//     try {
//         // Find the book
//         const book = await Book.findById(bookId);

//         // Find the user to check the number of borrowed books
//         const user = await User.findById(userId);

//         // Check if the user has already borrowed 4 books
//         if (user.borrowed_books.length >= 4) {
//             throw new Error("You have reached the maximum limit of borrowed books (4).");
//         }

//         // Check if the book exists and has available copies
//         if (!book || book.copies_available === 0) {
//             throw new Error("Book not available for borrowing");
//         }

//         // Update the book's copies_available field and push the user ID to borrowed_by
//         book.copies_available -= 1;
//         book.borrowed_by.push(userId);
        
//         // Save the changes to the book
//         await book.save();

//         // Create a new borrowing history entry
//         const newBorrowingHistory = new BorrowingHistory({
//             user: userId,
//             book: bookId,
//             borrow_date: new Date()
//         });

//         // Save the borrowing history entry
//         const savedHistory = await newBorrowingHistory.save();

//         // Update the user's borrowed_books array
//         user.borrowed_books.push(bookId);
//         await user.save();

//         return savedHistory;
//     } catch (error) {
//         throw error;
//     }
// };
exports.borrowBook = async (userId, bookId) => {
    try {
        // Find the book
        const book = await Book.findById(bookId);

        // Find the user to check the number of borrowed books and existing ISBNs
        const user = await User.findById(userId);

        // Check if the user has already borrowed 4 books
        if (user.borrowed_books.length >= 4) {
            throw new Error("You have reached the maximum limit of borrowed books (4).");
        }

        // Check if the book exists and has available copies
        if (!book || book.copies_available === 0) {
            throw new Error("Book not available for borrowing");
        }

        // Check if the user has already borrowed a book with the same ISBN
        const booksWithSameIsbn = await Book.find({ isbn: book.isbn, _id: { $in: user.borrowed_books } });
        if (booksWithSameIsbn.length > 0) {
            throw new Error("You have already borrowed a book with the same ISBN.");
        }

        // Update the book's copies_available field and push the user ID to borrowed_by
        book.copies_available -= 1;
        book.borrowed_by.push(userId);
        
        // Save the changes to the book
        await book.save();

        // Create a new borrowing history entry
        const newBorrowingHistory = new BorrowingHistory({
            user: userId,
            book: bookId,
            borrow_date: new Date()
        });

        // Save the borrowing history entry
        const savedHistory = await newBorrowingHistory.save();

        // Update the user's borrowed_books array
        user.borrowed_books.push(bookId);
        await user.save();

        return savedHistory;
    } catch (error) {
        throw error;
    }
};
exports.getAllBooks = async () => {
    try {
        const allBooks = await Book.find().populate('borrowed_by', 'full_name phone');
        return allBooks;
    } catch (error) {
        throw error;
    }
};

exports.updateBook = async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;
  
    try {
      // Find and update the book
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, { new: true });
  
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  exports.updateBook = async (bookId, updatedData) => {
    try {
        if (Object.keys(updatedData).length === 0) {
            return null; // No changes made
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        if (!updatedBook) {
            throw new Error("Book not found");
        }
        return updatedBook;
    } catch (error) {
        throw error;
    }
};
