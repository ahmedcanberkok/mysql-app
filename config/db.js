const mysql = require('mysql2');
require('dotenv').config();

// Veritabanı bağlantısını oluştur
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Bağlantıyı kontrol et
connection.connect((err) => {
    if (err) {
        console.error('MySQL bağlantısı başarısız:', err.message);
    } else {
        console.log('MySQL veritabanına başarıyla bağlanıldı!');
    }
});

module.exports = connection;
 