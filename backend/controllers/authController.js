const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. KONTROLLER REGISTER (Pendaftaran Akun Baru)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Cek apakah email sudah terdaftar
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        // Enkripsi (hash) password menggunakan bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan user baru ke MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Password teracak
            role: role || 'rakyat'
        });

        res.status(201).json({
            message: 'Registrasi berhasil!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. KONTROLLER LOGIN (Verifikasi Password & Kirim JWT Token)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek email di database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        // Bandingkan password mentah dengan password terenkripsi di DB
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        // Bikin Token JWT (Berisi ID & Role User)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Berlaku 1 hari
        );

        res.json({
            message: 'Login berhasil!',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
