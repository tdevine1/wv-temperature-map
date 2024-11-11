const express = require('express');
const bcrypt = require('bcryptjs');
const { sql } = require('../config');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
