import TodoItem from './TodoItem';

function TodoList({
  todos,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
