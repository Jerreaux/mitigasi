const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Terhubung: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error koneksi MongoDB: ${error.message}`);
        process.exit(1); // Menghentikan server jika database gagal terhubung
    }
};
module.exports = connectDB;