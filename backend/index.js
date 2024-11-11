require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Authentication routes
app.use('/auth', authRoutes);

// Protected route example for fetching temperatures
app.get('/protected-temperatures', authMiddleware, (req, res) => {
  // Add logic here to fetch and send temperature data
  res.json({ message: 'This is protected temperature data' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
