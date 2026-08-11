const mongoose = require('mongoose');

const citizenReportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Judul laporan wajib diisi']
        },
        category: {
            type: String,
            default: 'Flooding'
        },
        status: {
            type: String,
            enum: ['pending', 'verified', 'in-progress', 'resolved'],
            default: 'pending'
        },
        location: {
            type: String,
            required: [true, 'Lokasi wajib diisi']
        },
        reportedAt: {
            type: Date,
            default: Date.now
        },
        priority: {
            type: String,
            enum: ['low', 'moderate', 'high', 'critical'],
            default: 'moderate'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CitizenReport', citizenReportSchema);