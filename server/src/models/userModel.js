const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    full_name: String,
    email: String,
    phone: String,
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
