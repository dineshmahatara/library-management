const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },
    studentId: String,
    iemisId:String,
    full_name: String,
    email: String,
    phone: String,
    parentEmail: String,
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
