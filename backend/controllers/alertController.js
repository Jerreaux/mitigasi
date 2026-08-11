const Alert = require('../models/Alert');

const getAlerts = async (req, res) => {
    try {
        const alert = await Alert.find();
        res.json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAlertById = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        res.json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAlert = async (req, res) => {
    try {
        const newAlert = await Alert.create(req.body);
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAlert = async (req, res) => {
    try {
        const updatedAlert = await Alert.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAlert) return res.status(404).json({ message: 'Alert tidak ditemukan' });
        res.json(updatedAlert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAlerts,
    getAlertById,
    createAlert,
    updateAlert
};