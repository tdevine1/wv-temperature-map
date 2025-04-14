// backend/config/database.js
require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');

console.log('Connected to ', process.env.DB_HOST + ":" + process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {ca: fs.readFileSync(__dirname + '\\DigiCertGlobalRootCA.crt.pem')}
});

module.exports = pool;

