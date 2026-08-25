import React from 'react';
import TodoCard from './TodoCard';
import { isTodoOverdue } from '../utils/todo';

function TodoList({ todos, onToggle, onEdit, onDelete, isLoading }) {
  const overdueCount = todos.filter((todo) => isTodoOverdue(todo, new Date())).length;

  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <p className="empty-state-message">
          No todos yet. Add one to get started! 👻
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {overdueCount > 0 && (
        <div className="todo-summary" aria-live="polite" role="status">
          {overdueCount === 1 ? '1 overdue task' : `${overdueCount} overdue tasks`}
        </div>
      )}
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default TodoList;
