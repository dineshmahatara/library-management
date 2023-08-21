const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    studentId: String,
    full_name: String,
    email: String,
    munId:String,
    phone: String,
    parentEmail: String,
    municiapalityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipality' },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
