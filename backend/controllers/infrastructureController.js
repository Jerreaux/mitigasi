const InfrastructureAssets = require('../models/InfrastructureAsset');

const getInfrastructureAssets = async (req, res) => {
    try {
        const infrastructureAssets = await InfrastructureAssets.find()
        res.json(infrastructureAssets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInfrastructureAssetsById = async (req, res) => {
    try {
        const infrastructureAssets = await InfrastructureAssets.findById(req.params.id);
        res.json(infrastructureAssets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createInfrastructureAssets = async (req, res) => {
    try {
        const newInfrastructureAssets = await InfrastructureAssets.create(req.body);
        res.status(201).json(newInfrastructureAssets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getInfrastructureAssets,
    getInfrastructureAssetsById,
    createInfrastructureAssets
};
