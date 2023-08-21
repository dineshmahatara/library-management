const Municipality = require('../models/municipalityModel');
const School = require('../models/schoolModel');


exports.createMunicipality = async (municipalityData) => {
    try {
        // Check if a municipality with the same name already exists in the same district
        const existingMunicipalityWithSameNameInDistrict = await Municipality.findOne({
            name: municipalityData.name,
            district: municipalityData.district
        });

        if (existingMunicipalityWithSameNameInDistrict) {
            throw new Error('A municipality with the same name already exists in the same district.');
        }

        const newMunicipality = new Municipality(municipalityData);
        return await newMunicipality.save();
    } catch (error) {
        throw error;
    }
};





exports.addSchoolToMunicipality = async (municipalityId, schoolData) => {
    try {
        // Create a new School document with school-specific fields
        const newSchool = new School(schoolData);
        await newSchool.save();

        // Update the Municipality's schools array with the newly created school
        const updatedMunicipality = await Municipality.findByIdAndUpdate(
            municipalityId,
            {
                $push: { schools: newSchool._id }, // Add school ID to schools array
                // Update other fields in the municipality document as needed based on schoolData
                // Example: { $set: { schoolName: schoolData.schoolName, principalName: schoolData.principalName } }
            },
            { new: true }
        );

        return updatedMunicipality;
    } catch (error) {
        throw error;
    }
};
