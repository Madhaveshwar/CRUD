import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  // State for input field
  const [title, setTitle] = useState('');
  // State for loading during submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      alert('Please enter a todo title');
      return;
    }

    try {
      setIsSubmitting(true);
      // Call parent's onAddTodo function
      await onAddTodo(title);
      // Clear input field after successful submission
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        disabled={isSubmitting}
        className="todo-input"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="todo-button"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}

export default TodoForm;
