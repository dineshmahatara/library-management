const Student = require('../models/studentModel');

exports.createStudent = async (studentData) => {
    try {
        const newStudent = new Student(studentData);
        return await newStudent.save();
    } catch (error) {
        throw error;
    }
};
