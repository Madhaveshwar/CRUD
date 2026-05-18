const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
// Route: GET /api/todos
router.get('/', todoController.getAllTodos);

// POST create a new todo
// Route: POST /api/todos
router.post('/', todoController.createTodo);

// PUT update a todo
// Route: PUT /api/todos/:id
router.put('/:id', todoController.updateTodo);

// DELETE a todo
// Route: DELETE /api/todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
