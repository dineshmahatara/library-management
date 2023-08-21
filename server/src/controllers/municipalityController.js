
const Municipality = require('../models/municipalityModel')

exports.createMunicipality = async (municipalityData) => {
    try {
        const newMunicipality = new Municipality(municipalityData);
        return await newMunicipality.save();
    } catch (error) {
        throw error;
    }
};
