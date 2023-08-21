const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  school: mongoose.Schema.Types.ObjectId,
  birthdate: Date,
  grade: String,
  createdAt: Date,
  updatedAt: Date,
  // Other fields
});

const Student = mongoose.model('Student', studentSchema);
