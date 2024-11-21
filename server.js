const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;




// Middleware
app.use(express.json());
app.use('/api/employees',employeeRoutes);


// Test Route
app.get('/', (req, res) => {
    res.send('Node.js MySQL uygulaması çalışıyor!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
});
