const express = require('express');
const router = express.Router();
const {
    getCitizenReports,
    getCitizenReportsById,
    createCitizenReports,
    updateCitizenReports
} = require('../controllers/reportController');

router.get('/', getCitizenReports);
router.get('/:id', getCitizenReportsById);
router.post('/', createCitizenReports);
router.put('/:id', updateCitizenReports);

module.exports = router;