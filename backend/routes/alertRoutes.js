const express = require('express');
const router = express.Router();
const { getAlerts, getAlertById, createAlert, updateAlert } = require('../controllers/alertController');

router.get('/', getAlerts);
router.get('/:id', getAlertById);
router.post('/', createAlert);
router.put('/:id', updateAlert);

module.exports = router;