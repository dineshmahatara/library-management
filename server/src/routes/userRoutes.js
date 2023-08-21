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
const sendRegistrationEmail = require('../middleWare/emailMiddleware'); // Import the email sending function

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

// New route for resending activation link
router.post('/resend-activation-link', async (req, res) => {
    const { phone } = req.body;

    try {
        // Find the user by phone
        const user = await Users.findOne({ phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a new activation token and update user's details
        user.generateActivationToken();
        await user.save();

        // Send the new activation link to the user's email
        const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
        sendRegistrationEmail(user, activationLink);

        res.json({ message: 'Activation link has been resent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;