const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const sendEmail = require('../middleware/emailMiddleware');
const generateEmailTemplate = require('../templete/activateTemplate'); // Import the new email template

router.get('/activate', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Missing activation token' });
    }

    try {
        const user = await User.findOne({ activationToken: token });

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



// // const express = require('express');
// // const router = express.Router();
// // const activeService = require('../services/activeService');
// // const sendRegistrationEmail = require('../middleWare/emailMiddleware');
// // const { generateRandomToken } = require('../utils/tokenUtils'); // Import your token generation function

// // router.get('/activate', async (req, res) => {
// //     const { token } = req.query;

// //     if (!token) {
// //         return res.status(400).json({ message: 'Missing activation token' });
// //     }

// //     try {
// //         const activationResult = await activeService.activateUser(token);

// //         if (activationResult.alreadyActivated) {
// //             // User's account was already activated
// //             return res.send(`
// //                 <html>
// //                 <head>
// //                     <title>Already Activated</title>
// //                 </head>
// //                 <body>
// //                     <h1>Account Already Activated</h1>
// //                     <p>Your account has already been activated.</p>
// //                     <p>You can now proceed to the <a href="/login">login page</a>.</p>
// //                 </body>
// //                 </html>
// //             `);
// //         }

// //         // User's account was successfully activated
// //         res.send(`
// //             <html>
// //             <head>
// //                 <title>Activation Successful</title>
// //                 <meta http-equiv="refresh" content="3;url=/login">
// //             </head>
// //             <body>
// //                 <h1>Activation Successful</h1>
// //                 <p>Your account has been activated. You will be redirected to the login page in 3 seconds...</p>
// //             </body>
// //             </html>
// //         `);
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error activating user' });
// //     }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');
// const sendRegistrationEmail = require('../middleware/emailMiddleware');
// const generateEmailTemplate = require('../templete/activateTemplate'); // Import the new email template
// //

// router.get('/activate', async (req, res) => {
//     const { token } = req.query;
  
//     if (!token) {
//       return res.status(400).json({ message: 'Missing activation token' });
//     }
  
//     try {
//       const user = await User.findOne({ activationToken: token });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       user.status = 'Active';
//       user.activationToken = undefined;
//       await user.save();
  
//       const activationLink = `${process.env.SITE_ADDRESS}/login`; // Update the redirection link
  
//       // Use the new email template for activation
//       const emailTemplate = generateEmailTemplate(user, activationLink);
  
//       // Send the activation email using the emailMiddleware
//       sendRegistrationEmail(user, emailTemplate);
  
//       return res.redirect('/login'); // Redirect to a login page or a success page
//     } catch (error) {
//       return res.status(500).json({ message: 'Error activating user' });
//     }
//   });
  

// module.exports = router;
