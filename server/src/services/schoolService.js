const School = require('../models/schoolModel');

exports.createSchool = async (schoolData) => {
    try {
        // Check if the iemisId is already used
        const existingSchoolWithIemisId = await School.findOne({ iemisId: schoolData.iemisId });
        if (existingSchoolWithIemisId) {
            throw new Error('A school with the same iemisId already exists.');
        }

        const newSchool = new School(schoolData);
        return await newSchool.save();
    } catch (error) {
        throw error;
    }
};
