const express = require('express');
const router = express.Router();
const activeService = require('../services/activeService');

router.get('/activate', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Missing activation token' });
    }

    try {
        const activationResult = await activeService.activateUser(token);

        if (activationResult.alreadyActivated) {
            // User's account was already activated
            return res.send(`
                <html>
                <head>
                    <title>Already Activated</title>
                </head>
                <body>
                    <h1>Account Already Activated</h1>
                    <p>Your account has already been activated.</p>
                    <p>You can now proceed to the <a href="/login">login page</a>.</p>
                </body>
                </html>
            `);
        }

        // User's account was successfully activated
        res.send(`
            <html>
            <head>
                <title>Activation Successful</title>
                <meta http-equiv="refresh" content="3;url=/login">
            </head>
            <body>
                <h1>Activation Successful</h1>
                <p>Your account has been activated. You will be redirected to the login page in 3 seconds...</p>
            </body>
            </html>
        `);
    } catch (error) {
        return res.status(500).json({ message: 'Error activating user' });
    }
});

module.exports = router;
