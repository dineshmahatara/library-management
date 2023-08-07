
const userController = require('../controllers/userControllers')
const User = require('../models/userModel');

exports.createUser = async (userData) => {
        console.log('Received userData:', userData);

    try {
        return await userController.createUser(userData);
    } catch (error) {
        throw error;
    }
}

exports.getUserWithTotalBorrowedBooks = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate('borrowed_books', 'title') // Populate only with book title
            .exec();

        const totalBorrowedBooks = user.borrowed_books.length;

        return {
            user: user,
            totalBorrowedBooks: totalBorrowedBooks
        };
    } catch (error) {
        throw error;
    }
};
