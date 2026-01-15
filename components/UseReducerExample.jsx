"use client";

import { useReducer } from "react";

// useReducer implementation example
// Why useReducer instead of useState:
// 1. Multiple related states that change together
// 2. Complex state logic with multiple actions
// 3. Predictable state updates with defined action types
// 4. Easier to test and maintain state logic in one place
// 5. Better separation of concerns - state logic separate from UI

// Initial state for counter application
const initialState = {
  count: 0,
  step: 1,
  history: []
};

// Reducer function - pure function that handles all state updates
// Takes current state and action, returns new state
// This makes state changes predictable and centralized
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, `+${state.step}`]
      };
    
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, `-${state.step}`]
      };
    
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: []
      };
    
    case 'UNDO':
      if (state.history.length === 0) return state;
      
      const lastAction = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      
      return {
        ...state,
        count: state.count - (lastAction.startsWith('+') ? parseInt(lastAction.slice(1)) : -parseInt(lastAction.slice(1))),
        history: newHistory
      };
    
    default:
      return state;
  }
};

export default function UseReducerExample() {
  // useReducer hook replaces multiple useState calls
  // Returns [currentState, dispatch] - dispatch sends actions to reducer
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const { count, step, history } = state;

  return (
    <div className="border-2 border-pink-500 p-4 rounded-lg mb-8 max-w-md">
      <h3 className="text-lg font-bold mb-4">useReducer Example - Counter</h3>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-pink-600 mb-2">{count}</div>
        <div className="text-sm text-gray-600">Current Count</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Step Size: {step}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => dispatch({ type: 'SET_STEP', payload: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Increment +{step}
        </button>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Decrement -{step}
        </button>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={history.length === 0}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Undo
        </button>
      </div>

      { history.length > 0 &&
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-sm">Action History:</h4>
          <div className="bg-gray-50 p-2 rounded text-xs font-mono max-h-20 overflow-y-auto">
            {history.map((action, index) => (
              <span key={index}>
                {action}
                {index < history.length - 1 && ' → '}
              </span>
            ))}
          </div>
        </div>
      }

      <div className="bg-pink-50 p-3 rounded text-sm">
        <h4 className="font-semibold mb-2">useReducer Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Centralized state logic in reducer function</li>
          <li>Predictable state updates with action types</li>
          <li>Easy to test state transitions</li>
          <li>Better for complex state with multiple related values</li>
          <li>Separation of concerns (logic vs UI)</li>
        </ul>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: useReducer hook, action dispatching, complex state management
      </p>
    </div>
  );
}
