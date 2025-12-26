"use client";

import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React basics", completed: true },
    { id: 2, text: "Create components", completed: true },
    { id: 3, text: "Understand state management", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="border-2 border-amber-500 p-4 rounded-lg mb-8 max-w-md">
      <h3 className="text-lg font-bold mb-4">TodoList Component - Lists & Keys</h3>
      
      <div className="mb-4">
        <p className="mb-2">Progress: {completedCount}/{totalCount} completed</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button 
          onClick={addTodo}
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="list-none p-0 m-0">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className={`flex items-center p-2 mb-1 rounded-md ${
              todo.completed ? 'bg-green-50 line-through' : 'bg-amber-50'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span className="flex-1">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      )}

      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: lists, keys, array methods, conditional rendering
      </p>
    </div>
  );
}
