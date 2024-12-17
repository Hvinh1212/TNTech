// // config/db.js
// const { Pool } = require('pg');
// require('dotenv').config(); // Nạp các biến môi trường từ file .env

// // Tạo kết nối với PostgreSQL
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err);
//   } else {
//     console.log('Connected to PostgreSQL.');
//   }
// });

// module.exports = pool;

const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qlshop",
  password: "123",
  port: 5432,
});

module.exports = pool;