const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Import semua Model
const FloodZone = require('./models/Floodzone');
const CitizenReport = require('./models/CitizenReport');
const InfrastructureAsset = require('./models/InfrastructureAsset');
const Alert = require('./models/Alert');
const User = require('./models/user');

dotenv.config();

// Data baru (bukan dari frontend)
const floodZones = [
    {
        name: 'Sungai Brantas Sektor 1',
        district: 'Surabaya',
        riskLevel: 'high',
        waterLevel: 3.2,
        population: 15000,
        lat: -7.2575,
        lng: 112.7521
    },
    {
        name: 'Kali Surabaya Hilir',
        district: 'Gresik',
        riskLevel: 'moderate',
        waterLevel: 2.1,
        population: 8500,
        lat: -7.1625,
        lng: 112.6508
    }
];

const citizenReports = [
    {
        title: 'Banjir di Jl. Ahmad Yani',
        category: 'Flooding',
        status: 'pending',
        location: 'Surabaya Selatan',
        priority: 'high'
    },
    {
        title: 'Drainase tersumbat sampah',
        category: 'Drainage',
        status: 'verified',
        location: 'Gresik Kota',
        priority: 'moderate'
    }
];

const infrastructureAssets = [
    {
        name: 'Pompa Air Wonokromo',
        type: 'Pumping Station',
        condition: 'good',
        lastInspection: new Date('2026-07-01'),
        riskScore: 25,
        location: 'Surabaya'
    },
    {
        name: 'Tanggul Kali Lamong',
        type: 'Embankment',
        condition: 'poor',
        lastInspection: new Date('2026-06-15'),
        riskScore: 72,
        location: 'Gresik'
    }
];

const alerts = [
    {
        title: 'Ketinggian air kritis — Sungai Brantas Sektor 1',
        severity: 'critical',
        zone: 'Surabaya',
        actionKey: 'evacuate'
    },
    {
        title: 'Curah hujan tinggi diprediksi 6 jam ke depan',
        severity: 'high',
        zone: 'Gresik',
        actionKey: 'deploy'
    },
    {
        title: 'Kebanjiran di Jakarta selama 5 hari berturut-turut',
        severity: 'critical',
        zone: 'Jakarta',
        actionKey: 'evacuate'
    }
];

const passwordAdmin = bcrypt.hashSync('admin', 10);
const passwordBPBD = bcrypt.hashSync('BPBD', 10);

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: passwordAdmin,
        role: 'admin'
    },
    {
        name: 'Petugas BPBD',
        email: 'BPBD@gmail.com',
        password: passwordBPBD,
        role: 'pegawai'
    }
]

// Fungsi untuk masukin data
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Terhubung ke MongoDB');

        // Hapus data lama (biar ga dobel kalau jalanin ulang)
        await FloodZone.deleteMany();
        await CitizenReport.deleteMany();
        await InfrastructureAsset.deleteMany();
        await Alert.deleteMany();
        await User.deleteMany();
        console.log('🗑️  Data lama dihapus');

        // Masukkan data baru
        await FloodZone.insertMany(floodZones);
        await CitizenReport.insertMany(citizenReports);
        await InfrastructureAsset.insertMany(infrastructureAssets);
        await Alert.insertMany(alerts);
        await User.insertMany(users);
        console.log('✅ Data baru berhasil dimasukkan!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Gagal seed:', error.message);
        process.exit(1);
    }
};

seedDB();
