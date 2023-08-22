const User = require('../models/userModel');
const sendRegistrationEmail = require('../middleWare/emailMiddleware');

exports.activateUser = async (activationToken) => {
    try {
        const user = await User.findOne({ activationToken });

        if (!user) {
            throw new Error('Token Expired or User not found');
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

exports.resendActivationLink = async (phone) => {
    try {
        // Find the user by phone
        const user = await User.findOne({ phone });

        if (!user) {
            throw new Error('User not found');
        }

        // Generate a new activation token and update user's details
        user.generateActivationToken(); // Use the method you defined in userModel.js
        await user.save();

        // Send the new activation link using the same emailMiddleware function
        const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
        sendRegistrationEmail(user, activationLink);

        return 'Activation link has been resent';
    } catch (error) {
        throw error;
    }
};




// const User = require('../models/userModel'); // Import the User model
// const sendRegistrationEmail = require('../middleWare/emailMiddleware');
// const { generateRandomToken } = require('../utils/tokenUtils'); // Import your token generation function
// const userController = require('../controllers/userControllers')

// exports.activateUser = async (activationToken) => {
//     try {
//         const user = await User.findOne({ activationToken });

//         if (!user) {
//             throw new Error('User not found');
//         }

//         if (user.status === 'Active') {
//             // User account is already active
//             return { user, alreadyActivated: true };
//         }

//         user.status = 'Active';
//         user.activationToken = undefined; // Clear the token after activation
//         await user.save();

//         return { user, alreadyActivated: false };
//     } catch (error) {
//         throw error;
//     }
// };
// exports.resendActivationLink = async (phone) => {
//     try {
//       // Find the user by phone
//       const user = await User.findOne({ phone });
  
//       if (!user) {
//         throw new Error('User not found');
//       }
  
//       // Generate a new activation token and update user's details
//       user.generateActivationToken(); // Use the method you defined in userModel.js
//       await user.save();
  
//       // Send the new activation link using the same emailMiddleware function
//       const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
//       sendRegistrationEmail(user, activationLink);
  
//       return 'Activation link has been resent';
//     } catch (error) {
//       throw error;
//     }
//   };