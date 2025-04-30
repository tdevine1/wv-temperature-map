// backend/auth.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js'; 

// Create the router instance
const router = express.Router();
/**
 * Registers a new user by hashing the password and storing user data in the database.
 * @route POST /register
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user (will be hashed before storing).
 * @returns {JSON} Success message or error message.
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Use the promise API to execute the INSERT query
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

/**
 * Authenticates a user by verifying the password and generates a JWT for session management.
 * @route POST /login
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user (plain text).
 * @returns {JSON} Success message with JWT cookie or error message.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Query the database for the user by username
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    const user = rows[0];
    
    // If user exists and the password matches, generate a JWT
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Set JWT in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

export default router;