"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

// React.memo optimization for CelsiusInput child component
// Without React.memo: Re-renders whenever parent re-renders, even if temperature value hasn't changed
// With React.memo: Only re-renders when celsius prop or onCelsiusChange callback changes
// This is beneficial because:
// 1. It's a simple presentational component that just displays an input
// 2. It receives props that may not change on every parent render
// 3. It prevents unnecessary DOM updates and input re-focus issues
const CelsiusInput = React.memo(function CelsiusInput({ celsius, onCelsiusChange }) {
  return (
    <Box className="mb-4">
      <label className="block mb-2 text-sm font-medium">Celsius</label>
      <input
        type="number"
        value={celsius || ""}
        onChange={(e) => onCelsiusChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Box>
  );
});

// React.memo optimization for FahrenheitInput child component
// Without React.memo: Re-renders whenever parent re-renders, even if temperature value hasn't changed
// With React.memo: Only re-renders when fahrenheit prop or onFahrenheitChange callback changes
const FahrenheitInput = React.memo(function FahrenheitInput({ fahrenheit, onFahrenheitChange }) {
  return (
    <Box className="mb-4">
      <label className="block mb-2 text-sm font-medium">Fahrenheit</label>
      <input
        type="number"
        value={fahrenheit || ""}
        onChange={(e) => onFahrenheitChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Box>
  );
});

// Parent Component: Lifts the state up
// 
// HOW IT WORKS - Lifting State Up:
// 1. State is stored in the parent component (not in child components)
// 2. Both child components receive the state as props
// 3. When a child component needs to update the state, it calls a callback function
//    passed from the parent (onCelsiusChange or onFahrenheitChange)
// 4. The parent updates the state and passes the new value to both children
// 5. This allows multiple components to share and synchronize the same state
//
// Benefits:
// - Single source of truth (state in one place)
// - Components stay in sync automatically
// - Easier to debug and maintain
export default function LiftingStateUp() {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  // Convert temperature based on which scale was last updated
  const celsius =
    scale === "f" ? ((parseFloat(temperature) - 32) * 5) / 9 : temperature;
  const fahrenheit =
    scale === "c" ? (parseFloat(temperature) * 9) / 5 + 32 : temperature;

  // Callback function passed to CelsiusInput child component
  // When Celsius input changes, this updates the parent state
  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale("c");
  };

  // Callback function passed to FahrenheitInput child component
  // When Fahrenheit input changes, this updates the parent state
  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale("f");
  };

  return (
    <Card elevation={3} className="h-full">
      <CardContent className="p-4">
        <Typography
          variant="h6"
          component="h2"
          className="mb-4 font-bold"
          sx={{ color: "primary.main" }}
        >
          Lifting State Up Example
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          The temperature state is lifted up to the parent component, allowing
          both child components to share and update the same state.
        </Typography>

        <Paper elevation={1} className="p-4 mb-4 bg-blue-50">
          <Typography variant="caption" className="font-semibold block mb-2">
            Current State (in Parent):
          </Typography>
          <Typography variant="body2">
            Temperature: {temperature || "0"}°{scale === "c" ? "C" : "F"}
          </Typography>
        </Paper>

        <Box className="space-y-3">
          {/* 
            Both child components receive state and callbacks as props.
            The state flows down from parent to children.
            When children need to update state, they call the parent's callback.
            This is the essence of "lifting state up".
          */}
          <CelsiusInput
            celsius={celsius || ""}
            onCelsiusChange={handleCelsiusChange}
          />
          <FahrenheitInput
            fahrenheit={fahrenheit || ""}
            onFahrenheitChange={handleFahrenheitChange}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

