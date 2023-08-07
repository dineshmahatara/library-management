const Book = require('../models/bookModel');

exports.createBook = async (bookData) => {
    console.log("incoming ",bookData);
    try {
        // Check if a book with the same ISBN already exists
        const existingBook = await Book.findOne({ isbn: bookData.isbn });
        conole.log("existing Book: ", existingBook);

        if (existingBook) {
            throw new Error("This ISBN is already registered");
        }

        const newBook = new Book(bookData);
        return await newBook.save();
    } catch (error) {
        throw error;
    }
};
