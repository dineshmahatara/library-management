const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    munId:String,
    district: String,
    province: String,
    schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const Municipality = mongoose.model('Municipality', municipalitySchema);

module.exports = Municipality;
