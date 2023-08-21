const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.activate = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Missing activation token' });
    }

    try {
        const user = await User.findOne({ activationToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'Active';
        user.activationToken = undefined; // Optional: Clear the token after activation
        await user.save();

        return res.redirect('/login'); // Redirect to a login page or a success page
    } catch (error) {
        return res.status(500).json({ message: 'Error activating user' });
    }
};
