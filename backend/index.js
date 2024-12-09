/**
 * index.js
 *
 * Main entry point for the backend. Sets up the Express server,
 * establishes a connection to the database, and configures routes
 * and middleware for production deployment.
 */

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config'); // Function to connect to Azure SQL database
const authRoutes = require('./routes/auth'); // Authentication routes
const stacRoutes = require('./routes/stac'); // STAC routes, including temperature data

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies attached to client requests

// In production, no CORS is needed as both front-end and back-end share the same origin
if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://172.172.234.58:3000', credentials: true })); // Allow cross-origin requests in non-production mode
} else { // Serve the front-end static files in production mode
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    // Serve React app for any unknown routes
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
    });
}

// Route setup
app.use('/auth', authRoutes); // Authentication-related routes
app.use('/api/temperature', stacRoutes); // Routes for accessing temperature data

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
