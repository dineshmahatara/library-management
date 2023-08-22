const crypto = require('crypto'); // Import the crypto module
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['Admin', 'Municipality', 'School', 'Teacher', 'Student'],
        required: true
    },
    name: String,
    email: String,
    phone: String,
    province: String,
    district: String,
    iemisId: String,
    municipality: String,
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    password: String,
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    activationToken: String,
    activationTokenExpires: Date,
    activationEmailSentAt: Date // Add this field to the schema

});

// Method to generate and set activation token
userSchema.methods.generateActivationToken = function () {
    this.activationToken = crypto.randomBytes(20).toString('hex');
    this.activationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours
};

// Method to activate user
userSchema.methods.activateUser = function () {
    this.status = 'Active';
    this.activationToken = undefined;
    this.activationTokenExpires = undefined;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
