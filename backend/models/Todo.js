const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  // Title of the todo
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // Whether the todo is completed or not
  completed: {
    type: Boolean,
    default: false,
  },
  // Timestamps for when the todo was created and updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Todo model
module.exports = mongoose.model('Todo', todoSchema);
