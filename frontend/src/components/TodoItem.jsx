import { useState } from 'react';

function TodoItem({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}) {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State for edited title
  const [editTitle, setEditTitle] = useState(todo.title);
  // State for loading during operations
  const [isLoading, setIsLoading] = useState(false);

  // Handle toggle completion
  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggleTodo(todo._id, todo.completed);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      await onEditTodo(todo._id, editTitle);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsLoading(true);
      try {
        await onDeleteTodo(todo._id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isLoading}
        className="todo-checkbox"
      />

      {/* Edit mode or display mode */}
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isLoading}
            className="edit-input"
          />
          <button
            onClick={handleSaveEdit}
            disabled={isLoading}
            className="save-button"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={isLoading}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="view-mode">
          <span className="todo-title">{todo.title}</span>
          <div className="action-buttons">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
