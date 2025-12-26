"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increase = () => setCount(count + step);
  const decrease = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div className="border-2 border-blue-600 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-bold mb-4">Counter Component - State Management</h3>
      <p className="text-3xl font-bold mb-4">Count: {count}</p>
      
      <div className="mb-4">
        <label className="mr-2">Step: </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-16 px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      
      <div className="flex gap-2">
        <button onClick={decrease} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">Decrease</button>
        <button onClick={increase} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Increase</button>
        <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Reset</button>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: useState, event handlers, controlled inputs
      </p>
    </div>
  );
}
