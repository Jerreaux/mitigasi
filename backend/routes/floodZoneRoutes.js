const express = require('express');
const router = express.Router();
const {
    getFloodZones,
    getFloodZonesById,
    createFloodZones
} = require('../controllers/floodZoneController');

router.get('/', getFloodZones);
router.get('/:id', getFloodZonesById);
router.post('/', createFloodZones);

module.exports = router;