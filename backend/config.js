require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    enableArithAbort: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to Azure SQL Database");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { sql, connectDB };
console.log("Exported connectDB:", connectDB);

