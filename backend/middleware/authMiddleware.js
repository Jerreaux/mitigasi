const jwt = require('jsonwebtoken');

/**
 * 1. MIDDLEWARE: protect
 * Fungsi: Memastikan request membawa token JWT yang sah (Wajib Login).
 */
const protect = (req, res, next) => {
    let token;

    // A. Cek apakah ada header "Authorization" dan berawalan kata "Bearer"
    // Contoh format header yang benar: Authorization: Bearer eyJhbGciOiJIUzI1Ni...
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // B. Memisahkan kata "Bearer" dan string token menggunakan spasi.
            // Hasil split(' '): index 0 = "Bearer", index 1 = "eyJhbGciOi..." (token asli)
            token = req.headers.authorization.split(' ')[1];

            // C. Dekripsi & Verifikasi token menggunakan kunci rahasia JWT_SECRET kita
            // Jika token dimodifikasi hacker, proses ini akan gagal (throw error)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // D. Menyimpan data user (id & role) yang ada di dalam token ke object request (req.user)
            // Dengan begini, Controller atau Middleware berikutnya bisa tahu siapa yang sedang mengakses rute ini
            req.user = decoded;

            // E. Lolos pemeriksaan! Lanjutkan eksekusi ke Middleware berikutnya atau ke Controller
            next();
        } catch (error) {
            // Jika token kadaluwarsa atau tandatangannya salah
            return res.status(401).json({ message: 'Token tidak valid atau sudah kadaluwarsa!' });
        }
    }

    // F. Jika header "Authorization" tidak dikirim atau formatnya salah
    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak! Anda belum login.' });
    }
};

/**
 * 2. MIDDLEWARE: authorize(...roles)
 * Fungsi: Membatasi rute berdasarkan Role (Role-Based Access Control).
 * Parameter "...roles" bisa diisi banyak role sekaligus, contoh: authorize('admin', 'pegawai')
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        // A. Cek apakah role dari user yang sedang login (req.user.role) 
        // terdaftar di dalam daftar role yang diizinkan (roles)
        if (!roles.includes(req.user.role)) {
            // Jika role user tidak ada di daftar (misal rakyat mencoba akses halaman admin)
            return res.status(403).json({
                message: `Akses ditolak! Role '${req.user.role}' tidak memiliki izin ke rute ini.`
            });
        }

        // B. Lolos pemeriksaan role! Silakan lanjut ke rute tujuan
        next();
    };
};

module.exports = { protect, authorize };
