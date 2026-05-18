import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';

function App() {
  // State for storing all todos
  const [todos, setTodos] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch all todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a new todo
  const handleAddTodo = async (title) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(title);
      setTodos([newTodo, ...todos]); // Add new todo to the beginning
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  // Function to handle toggling todo completion status
  const handleToggleTodo = async (id, completed) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, {
        completed: !completed,
      });
      // Update the todo in state
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Function to handle editing a todo title
  const handleEditTodo = async (id, newTitle) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, {
        title: newTitle,
      });
      // Update the todo in state
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      // Remove todo from state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Todo App</h1>
        <p>A simple full-stack CRUD application</p>
      </header>

      <main className="app-main">
        {/* Display error messages if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Form to add new todos */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Show loading state */}
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Create one above! 🚀</p>
          </div>
        ) : (
          /* Display list of todos */
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
