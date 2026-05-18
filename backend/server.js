// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware setup
// Enable CORS to allow frontend requests
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// MongoDB Connection
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todos';

mongoose.connect(mongodbUri)
  .then(() => {
    console.log('✓ MongoDB Connected');
  })
  .catch((error) => {
    console.error('✗ MongoDB Connection Error:', error.message);
    process.exit(1);
  });

// Import routes
const todoRoutes = require('./routes/todos');

// Use routes
app.use('/api/todos', todoRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
});
