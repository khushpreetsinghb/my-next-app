"use client";
import React, { useState, memo, useRef, useEffect } from "react";

// Child component wrapped with React.memo
// React.memo prevents re-rendering when props haven't changed
// The "name" prop is always "John", so this component should only render once
const Child = memo(function Child({ name }) {
  const renderCount = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    renderCount.current += 1;
  });

  return (
    <div className="border border-green-500 p-3 rounded-md">
      <h3 className="font-semibold text-green-700">
        Hello {name}
      </h3>

      {mounted && (
        <p className="text-xs text-gray-600">
          Child renders: {renderCount.current}
        </p>
      )}
    </div>
  );
});

export default function ReactMemoExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="border-2 border-indigo-500 p-6 rounded-lg mb-8 max-w-md">
      <h3 className="text-lg font-bold mb-4">React.memo Example</h3>
      
      {/* Parent state that changes on every button click */}
      <div className="mb-4">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          Count: {count}
        </button>
      </div>

      {/* Child component with memo - should not re-render when count changes */}
      <div className="p-4 bg-gray-50 rounded-md">
        <Child name="John" />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2"><strong>How it works:</strong></p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Click the button to update parent count</li>
          <li>Child component is wrapped with React.memo</li>
          <li>Child only re-renders when its "name" prop changes</li>
          <li>Since name is always "John", child renders only once</li>
          <li>Check console to see render behavior</li>
        </ul>
      </div>
    </div>
  );
}
