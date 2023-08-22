const express = require('express');
const Users = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const activeService = require('../services/activeService');
const activeController = require('../controllers/activeControllers');

const sendEmail = require('../middleware/emailMiddleware');
const generateEmailTemplate = require('../templete/activateTemplate'); // Import the new email template
const generateResetPasswordTemplate = require('../templete/resetPasswordTemplate'); // Import the reset password template
const registrationTemplete = require('../templete/registrationTemplete'); // Import the reset password template

router.get('/activate', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Missing activation token' });
    }

    try {
        const user = await Users.findOne({ activationToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.status === 'Active') {
            return res.status(200).json({ message: 'User already activated' });
        }

        user.status = 'Active';
        user.activationToken = undefined;
        await user.save();

        const activationLink = `${process.env.SITE_ADDRESS}/login`; // Update the redirection link

        // Use the new email template for activation
        const emailTemplate = generateEmailTemplate(user, activationLink);

        // Send the activation email using the sendEmail function
        sendEmail(user, 'Account Activation', emailTemplate);

        return res.status(200).json({ message: 'User activated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error activating user' });
    }
});

module.exports = router;

// Route for sending activation link
router.post('/activation-link', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await activeService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the activation link to the user's email using the registration email template
        const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
        const emailTemplate = registrationTemplete(user, activationLink); // Use the registration template
        sendEmail(user, 'Activation Link', emailTemplate); // Use the sendEmail function

        res.json({ message: 'Activation link has been sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// New route for resending activation link
// ...

// ...

router.post('/resend-activation-link', async (req, res) => {
    const { phone } = req.body;

    try {
        // Find the user by phone
        const user = await Users.findOne({ phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found Try Again' });
        }

        if (user.status === 'Active') {
            return res.status(200).json({ message: 'User is already activated' });
        }

        // Check if the user has been sent an activation email within the last minute
        const currentTime = new Date();
        if (user.activationEmailSentAt && (currentTime - user.activationEmailSentAt) < 60000) {
            return res.status(200).json({ message: 'Activation email already sent within the last minute' });
        }

        // Generate a new activation token and update user's details
        user.generateActivationToken();
        user.activationEmailSentAt = currentTime; // Store the time when activation email is sent
        await user.save();

        // Send the new activation link to the user's email using the registration email template
        const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
        const emailTemplate = registrationTemplete(user, activationLink);
        sendEmail(user, 'Resend Activation Link', emailTemplate);

        res.json({ message: 'Activation link has been resent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

