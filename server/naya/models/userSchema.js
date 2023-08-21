const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  credentialLevel: String,
  government: { type: mongoose.Schema.Types.ObjectId, ref: 'Government' }, // Reference to Government
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' }, // Reference to Province
  localLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'LocalLevel' }, // Reference to LocalLevel
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }, // Reference to School
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Reference to Student
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Reference to Teacher
  fullName: String,
  phoneNumber: String,
  address: String,
});

const User = mongoose.model('User', userSchema);
