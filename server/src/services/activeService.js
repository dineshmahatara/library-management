const User = require('../models/userModel'); // Import the User model

exports.activateUser = async (activationToken) => {
    try {
        const user = await User.findOne({ activationToken });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.status === 'Active') {
            // User account is already active
            return { user, alreadyActivated: true };
        }

        user.status = 'Active';
        user.activationToken = undefined; // Clear the token after activation
        await user.save();

        return { user, alreadyActivated: false };
    } catch (error) {
        throw error;
    }
};
