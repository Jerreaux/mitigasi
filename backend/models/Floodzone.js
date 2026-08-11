const mongoose = require('mongoose');

const floodZoneSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama zona wajib diisi']
        },
        district: {
            type: String,
            required: [true, 'Nama daerah wajib diisi']
        },
        riskLevel: {
            type: String,
            enum: ['low', 'moderate', 'high', 'critical'],
            default: 'low'
        },
        waterLevel: {
            type: Number,
            required: [true, 'Ketinggian air wajib diisi'],
            default: 0
        },
        population: {
            type: Number,
            default: 0
        },
        lat: {
            type: Number,
            required: [true, 'Koordinat latitude wajib diisi']
        },
        lng: {
            type: Number,
            required: [true, 'Koordinat longitude wajib diisi']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('FloodZone', floodZoneSchema);
