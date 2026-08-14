const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.BACKEND_PORT || 5001;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

const floodZoneRoutes = require('./routes/floodZoneRoutes');

const reportRoutes = require('./routes/reportRoutes');

const infrastructureRoutes = require('./routes/infrastructureRoutes');

const alertRoutes = require('./routes/alertRoutes');

app.use('/api/auth', authRoutes);

app.use('/api/flood-zones', floodZoneRoutes);

app.use('/api/reports', reportRoutes);

app.use('/api/infrastructure', infrastructureRoutes);

app.use('/api/alerts', alertRoutes);


app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik')
})

app.listen(PORT, () => {
    console.log(`🚀 The server is running on port ${PORT}`)
})


