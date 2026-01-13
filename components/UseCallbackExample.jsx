"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";

// Normal child
const Child = ({ onClick }) => {
  const renders = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted) renders.current++;

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Increment (no useCallback)
      </button>
      {mounted && (
        <p className="text-xs text-red-700">Renders: {renders.current}</p>
      )}
    </div>
  );
};

// Memoized child
const MemoChild = React.memo(({ onClick }) => {
  const renders = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted) renders.current++;

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Increment (useCallback)
      </button>
      {mounted && (
        <p className="text-xs text-green-700">Renders: {renders.current}</p>
      )}
    </div>
  );
});

export default function UseCallbackVisual() {
  const [count, setCount] = useState(0);
  const [dummy, setDummy] = useState(0);

  const incrementWithoutCallback = () => {
    setCount((c) => c + 1);
  };

  const incrementWithCallback = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="border-2 border-blue-500 p-4 rounded-lg max-w-md space-y-3">
      <h3 className="text-lg font-bold">useCallback Visual Demo</h3>

      <p>Count: {count}</p>
      <p className="text-sm text-gray-600">Dummy: {dummy}</p>

      <div className="flex gap-6">
        <Child onClick={incrementWithoutCallback} />
        <MemoChild onClick={incrementWithCallback} />
      </div>

      <button
        onClick={() => setDummy((d) => d + 1)}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
      >
        Trigger Parent Re-render
      </button>

      <p className="text-sm text-gray-600">
        Red re-renders on parent update. Green does not.
      </p>
    </div>
  );
}
