// backend/config/database.js
import 'dotenv/config';
import mysql from 'mysql2/promise';
import fs    from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
import { dirname }       from 'path';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Path to your bundled CA cert
const caPath = path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem');

// Read it once at startup
const caCert = fs.readFileSync(caPath);

console.log('Loaded CA cert from:', caPath);
console.log('Connecting to', `${process.env.DB_HOST}:${process.env.DB_PORT}`);

const pool = mysql.createPool({
  host:               process.env.DB_HOST,
  user:               process.env.DB_USER,
  password:           process.env.DB_PASSWORD,
  database:           process.env.DB_NAME,
  port:               Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  ssl: {
    ca: caCert,                   // use the CA for TLS validation
    rejectUnauthorized: true
  }
});

pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('MySQL connection failed on startup:', err);
  });
  
export default pool;
