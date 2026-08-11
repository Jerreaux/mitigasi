const CitizenReport = require('../models/CitizenReport');

const getCitizenReports = async (req, res) => {
    try {
        const citizenReport = await CitizenReport.find()
        res.json(citizenReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCitizenReportsById = async (req, res) => {
    try {
        const citizenReport = await CitizenReport.findById(req.params.id);
        res.json(citizenReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCitizenReports = async (req, res) => {
    try {
        const newReport = await CitizenReport.create(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCitizenReports = async (req, res) => {
    try {
        const updatedReport = await CitizenReport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReport) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCitizenReports,
    getCitizenReportsById,
    createCitizenReports,
    updateCitizenReports
};