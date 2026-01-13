"use client";

import { useState, useMemo } from "react";

// useMemo Hook Example Component
// Purpose: Demonstrates how useMemo optimizes expensive calculations
// What useMemo does:
// 1. Caches the result of expensive calculations
// 2. Only recalculates when dependencies change
// 3. Prevents unnecessary re-computation on every render
// 4. Returns a memoized value

export default function UseMemoExample() {
  const [number, setNumber] = useState(5);
  const [multiplier, setMultiplier] = useState(2);

  // Expensive calculation without useMemo would run on every render
  // With useMemo, it only recalculates when number or multiplier changes
  const expensiveResult = useMemo(() => {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < number * 1000; i++) {
      result += i;
    }
    
    return result * multiplier;
  }, [number, multiplier]); // Dependencies - only recalculate when these change

  const incrementNumber = () => {
    setNumber(number + 1);
  };

  const decrementNumber = () => {
    if (number > 1) setNumber(number - 1);
  };

  return (
    <div className="border-2 border-purple-500 p-4 rounded-lg mb-8 max-w-md">
      <h3 className="text-lg font-bold mb-4">useMemo Hook Example</h3>
      
      <div className="mb-4 p-3 bg-purple-50 rounded">
        <p className="text-sm font-semibold mb-2">How useMemo works:</p>
        <ul className="text-xs space-y-1">
          <li>• Caches expensive calculation results</li>
          <li>• Only recalculates when dependencies change</li>
          <li>• Try changing number or multiplier to see optimization</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="mb-2">Number: {number}</p>
        <p className="mb-2">Multiplier: {multiplier}</p>
        
        <div className="p-2 bg-gray-100 rounded">
          <p className="text-sm">Expensive Calculation Result:</p>
          <p className="font-bold text-lg">{expensiveResult.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Multiplier:</label>
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={decrementNumber}
          className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
        >
          Decrease Number
        </button>
        <button 
          onClick={incrementNumber}
          className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
        >
          Increase Number
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: useMemo optimization, expensive calculations, dependency tracking
      </p>
    </div>
  );
}
