const express = require('express');
const router = express.Router();
const {
    getInfrastructureAssets,
    getInfrastructureAssetsById,
    createInfrastructureAssets
} = require('../controllers/infrastructureController');

router.get('/', getInfrastructureAssets);
router.get('/:id', getInfrastructureAssetsById);
router.post('/', createInfrastructureAssets);

module.exports = router;