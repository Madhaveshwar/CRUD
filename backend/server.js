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

const createFallbackTodoRouter = () => {
  const router = express.Router();
  const todos = [];

  const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  router.get('/', (req, res) => {
    res.json(todos);
  });

  router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = {
      _id: generateId(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    todos.unshift(todo);
    res.status(201).json(todo);
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex((todo) => todo._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) {
      todos[todoIndex].title = title.trim() || todos[todoIndex].title;
    }
    if (completed !== undefined) {
      todos[todoIndex].completed = completed;
    }

    res.json(todos[todoIndex]);
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully' });
  });

  return router;
};

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`✓ MongoDB Connected (${uri})`);
    return true;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error (${uri}):`, error.message);
    return false;
  }
};

const startServer = async () => {
  const connected = await connectToDatabase(mongodbUri);
  let routeHandler;

  if (connected) {
    routeHandler = require('./routes/todos');
  } else {
    const fallbackUri = 'mongodb://localhost:27017/todos';
    if (mongodbUri !== fallbackUri) {
      console.warn('Attempting fallback to local MongoDB...');
      const fallbackConnected = await connectToDatabase(fallbackUri);
      if (fallbackConnected) {
        routeHandler = require('./routes/todos');
      }
    }

    if (!routeHandler) {
      console.warn('Starting backend in in-memory fallback mode. Data will not persist after restart.');
      routeHandler = createFallbackTodoRouter();
    }
  }

  // Use routes
  app.use('/api/todos', routeHandler);

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
};

startServer();
