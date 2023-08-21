const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const SECRET_KEY = process.env.SECRET_KEY; // Read secret key from environment variable

// Function to generate a unique activation token
const generateRandomToken = () => {
    const tokenData = {
        id: uuidv4(), // Unique ID for the token
        type: 'activation' // Token type (for example: 'activation', 'reset')
    };

    const options = {
        expiresIn: '1 hour' // Token expiration time
    };

    return jwt.sign(tokenData, SECRET_KEY, options);
};

module.exports = {
    generateRandomToken
};
