import { useState } from 'react';

export default function TodoList({ todos, onAdd, onDelete, onToggle }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input, priority);
      setInput('');
      setPriority('medium');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h2>

      {/* Input section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* Todos list */}
      <div className="space-y-2">
        {sortedTodos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks yet. Add one to get started!</p>
        ) : (
          sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getPriorityColor(todo.priority)} transition`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <span className="text-xs text-gray-600">{todo.time}</span>
              <button
                onClick={() => onDelete(todo.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {todos.filter(t => t.completed).length} of {todos.length} completed
          </p>
        </div>
      )}
    </div>
  );
}