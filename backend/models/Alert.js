const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Judul wajib diisi']
        },
        severity: {
            type: String,
            enum: ['low', 'moderate', 'high', 'critical'],
            default: 'low'
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        zone: {
            type: String,
            required: [true, 'Zona wajib diisi']
        },
        actionKey: {
            type: String,
            enum: ['evacuate', 'deploy', 'monitor', 'inspect'],
            default: 'monitor'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Alert', AlertSchema);