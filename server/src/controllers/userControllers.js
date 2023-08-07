// controllers/userController.js
const User = require('../models/userModel');

exports.createUser = async (userData) => {
    console.log('Creating user with userData:', userData);
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}
exports.borrowBook = async (userId, bookId) => {
    try {
        const result = await userService.borrowBook(userId, bookId);
        return result;
    } catch (error) {
        throw error;
    }
};
