const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const sendPasswordResetEmail = require('../middleware/emailMiddleware'); // Import the email sending function

router.post('/forgot-password', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = userService.generateResetToken();

        // Update user's record with reset token
        await userService.updateUserWithResetToken(user._id, resetToken);

        // Send email with reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        sendPasswordResetEmail(user.email, resetLink);

        res.json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
