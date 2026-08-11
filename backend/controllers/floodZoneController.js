const FloodZone = require('../models/Floodzone');

const getFloodZones = async (req, res) => {
    try {
        const floodZones = await FloodZone.find()
        res.json(floodZones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFloodZonesById = async (req, res) => {
    try {
        const floodZone = await FloodZone.findById(req.params.id);
        res.json(floodZone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFloodZones = async (req, res) => {
    try {
        const newZone = await FloodZone.create(req.body);
        res.status(201).json(newZone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getFloodZones,
    getFloodZonesById,
    createFloodZones
};

