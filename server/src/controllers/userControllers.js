const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendRegistrationEmail = require('../middleWare/registrationMiddleware');
const { generateRandomToken } = require('../utils/tokenUtils'); // Import your token generation function

exports.createUser = async (userData) => {
    try {
        // Validate the role against allowed roles
        const allowedRoles = ['Admin', 'Municipality', 'School', 'Teacher', 'Student'];
        if (!allowedRoles.includes(userData.role)) {
            throw new Error('Invalid role. Allowed roles are: Admin, Municipality, School, Teacher, Student');
        }

        // Check if a user with the same email or phone already exists
        const existingUser = await User.findOne({
            $or: [
                { email: userData.email },
                { phone: userData.phone }
            ]
        });

        if (existingUser) {
            if (existingUser.email === userData.email) {
                throw new Error('Email is already registered');
            } else if (existingUser.phone === userData.phone) {
                throw new Error('Phone number is already registered');
            }
        }

        const hash = bcrypt.hashSync(userData.password, 10);
        userData.password = hash;

        const newUser = new User(userData);
        newUser.activationToken = generateRandomToken(); // Generate a unique activation token
        await newUser.save();

        // Send registration email
                const activationLink = `${process.env.SITE_ADDRESS}/api/activate?token=${newUser.activationToken}`;
                sendRegistrationEmail(newUser, activationLink); // Pass newUser object and activationLink

        return newUser;
    } catch (error) {
        throw error;
    }
};

exports.borrowBook = async (userId, bookId) => {
    try {
        const result = await userService.borrowBook(userId, bookId);
        return result;
    } catch (error) {
        throw error;
    }
};
exports.login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const loginResult = await userService.login(phone, password);
        res.json(loginResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


