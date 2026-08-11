const mongoose = require('mongoose');

const infrastructureAssetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama aset wajib diisi']
        },
        type: {
            type: String,
            enum: ['Flood Control', 'Pumping Station', 'Retention Basin', 'Embankment', 'Drainage'],
            required: [true, 'Jenis aset wajib diisi']
        },
        condition: {
            type: String,
            enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
            default: 'good'
        },
        lastInspection: {
            type: Date,
            default: Date.now
        },
        riskScore: {
            type: Number,
            required: [true, 'Skor resiko wajib diisi']
        },
        location: {
            type: String,
            required: [true, 'Lokasi wajib diisi']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('InfrastructureAsset', infrastructureAssetSchema)