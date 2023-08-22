require('dotenv').config(); // Add this line at the top of the file
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const studentService = require('../services/studentService');
const schoolService = require('../services/schoolService');
const municipalityService = require('../services/municipalityService');
const municipalityController = require('../controllers/municipalityController');
const schoolController = require('../controllers/schoolController');
const studentController = require('../controllers/studentController');
const Users = require('../models/userModel');
router.post('/users', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        
        // Depending on the role, create corresponding entity
        if (newUser.role === 'Municipality') {
            await municipalityService.createMunicipality({
                name: newUser.name,
                email: newUser.email,
                munId: newUser.munId,
                phone: newUser.phone,
                email: newUser.email,
                province: newUser.province,
                district:newUser.district
                // ...other municipality fields
            });
        } else if (newUser.role === 'School') {
            await schoolService.createSchool({
                municipalityId: newUser.municiapalityId, // Use the correct field name
                schoolName: newUser.schoolName, // Use the correct field name
                principalName: newUser.principalName,
                full_name: newUser.full_name,
                email: newUser.email,
                phone: newUser.phone,
                iemisId:newUser.iemisId,
                parentEmail: newUser.parentEmail,
                // ...other school fields
            });
        } else if (newUser.role === 'Student') {
            await studentService.createStudent({
                schoolId: newUser.schoolId,
                studentId: newUser.studentId,
                full_name: newUser.full_name,
                email: newUser.email,
                phone: newUser.phone,
                parentEmail: newUser.parentEmail,
                municiapalityId:newUser.municiapalityId,
                userId:newUser.newUser.userId
            
                // ...other student fields
            });
        }
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userData = await userService.getUserWithTotalBorrowedBooks(userId);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ phone: req?.body?.phone });

        if (userData) {
            if (userData.status !== 'Active') {
                // User is not active, prevent login
                return res.json({ message: 'User is not active', success: false });
            }

            const isMatched = await bcrypt.compare(req.body.password, userData.password);

            if (isMatched) {
                const token = jwt.sign({ phone: req.body.phone }, process.env.SECRET_KEY);
                res.json({
                    msg: 'login success',
                    isLoggedIn: true,
                    token: token,
                    id: userData._id,
                    role: userData.role,
                    name: userData.name,
                    municipality: userData.municipality,
                });
            } else {
                res.json({ message: 'Login Failed', success: false });
            }
        } else {
            res.json({ message: 'User does not exist', success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user by email
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a new activation token for password reset and update user's details
      user.generateActivationToken(); // Use the method you defined in userModel.js
      await user.save();
  
      // Send the password reset link to the user's email
      const resetPasswordLink = `http://localhost:4000/api/reset-password?token=${user.activationToken}`;
      const resetPasswordTemplate = generateResetPasswordTemplate(user, resetPasswordLink); // Use the reset template
      sendEmail(user, 'Password Reset', resetPasswordTemplate);
  
      res.json({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Implement the reset-password route to handle password reset based on the reset token
router.post('/reset-password/:token', async (req, res) => {
    
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user by userId and reset token
        const user = await Users.findOne({ _id: decodedToken.userId, resetToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Update the user's password and clear the reset token
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;