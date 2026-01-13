"use client";

import { useReducer } from "react";

// useReducer implementation for TodoList component
// Why useReducer instead of useState:
// 1. Multiple related states (todos, newTodo) that change together
// 2. Complex state logic with multiple actions (add, toggle, delete, update input)
// 3. Predictable state updates with defined action types
// 4. Easier to test and maintain state logic in one place
// 5. Better separation of concerns - state logic separate from UI

// Initial state for todo application
const initialState = {
  todos: [
    { id: 1, text: "Learn React basics", completed: true },
    { id: 2, text: "Create components", completed: true },
    { id: 3, text: "Understand state management", completed: false }
  ],
  newTodo: ""
};

// Reducer function - pure function that handles all state updates
// Takes current state and action, returns new state
// This makes state changes predictable and centralized
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Add new todo if input is not empty
      if (action.payload.trim()) {
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: Date.now(), // Using timestamp as unique ID
              text: action.payload,
              completed: false
            }
          ],
          newTodo: "" // Clear input after adding
        };
      }
      return state; // Return unchanged state if input is empty
    
    case 'TOGGLE_TODO':
      // Toggle completion status of a specific todo
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      // Remove a specific todo from the list
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'UPDATE_INPUT':
      // Update the new todo input field
      return {
        ...state,
        newTodo: action.payload
      };
    
    default:
      // Return current state for unknown actions
      return state;
  }
};

export default function TodoList() {
  // useReducer hook replaces multiple useState calls
  // Returns [currentState, dispatch] - dispatch sends actions to reducer
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, newTodo } = state;
  
  // list of fruits - demonstrating array mapping with keys
  const fruits = ["apple", "banana", "orange", "grape", "strawberry"];

  // Simple event handlers without useCallback for cleaner code
  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateNewTodo = (value) => {
    dispatch({ type: 'UPDATE_INPUT', payload: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Calculate statistics without useMemo for simplicity
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="border-2 border-amber-500 p-4 rounded-lg mb-8 max-w-md">
      <h3 className="text-lg font-bold mb-4">TodoList Component - Lists & Keys</h3>
      
      <div className="mb-4">
        <p className="mb-2">Progress: {completedCount}/{totalCount} completed</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => updateNewTodo(e.target.value)}
          onKeyDown={handleKeyPress}
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
        This component demonstrates: lists, keys, array methods, conditional rendering, useReducer pattern
      </p>
      {/* <div className="mt-4">
        <h4 className="font-semibold mb-2">Fruits List:</h4>
        <ul className="list-[square] list-inside text-sm">
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
