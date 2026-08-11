const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/admin-check', protect, authorize('admin'), (req, res) => {
    res.json({
        message: 'Selamat datang Admin! Anda memiliki akses penuh ke sistem.',
        user: req.user
    });
});

router.get('/pegawai-check', protect, authorize('pegawai', 'admin'), (req, res) => {
    res.json({
        message: 'Selamat datang Pegawai! Anda memiliki akses operasional.',
        user: req.user
    });
});

module.exports = router;