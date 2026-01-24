"use client";

import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={3} className="p-8 text-center">
        <Box className="mb-6">
          <AlertTriangle 
            size={64}
            className="text-red-500 mb-2"
          />
        </Box>
        
        <Typography variant="h4" component="h1" className="mb-4" color="error.main">
          Something went wrong!
        </Typography>
        
        <Typography variant="body1" className="mb-6 text-gray-600">
          We encountered an unexpected error while loading this page.
        </Typography>

        {process.env.NODE_ENV === 'development' && (
          <Box className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <Typography variant="subtitle2" className="mb-2" color="error.dark">
              Error Details (Development Only):
            </Typography>
            <Typography variant="body2" component="pre" className="text-xs text-red-800 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </Typography>
            {error.digest && (
              <Typography variant="body2" className="mt-2 text-xs text-red-600">
                Error ID: {error.digest}
              </Typography>
            )}
          </Box>
        )}

        <Box className="flex gap-3 justify-center">
          <Button
            variant="contained"
            startIcon={<RotateCcw />}
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </Box>

        <Box className="mt-8 p-4 bg-gray-50 rounded-lg">
          <Typography variant="h6" className="mb-2">
            📌 Error Boundary Demonstration
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-2">
            This error component automatically catches runtime errors in your app.
            In production, users see a friendly error message, while developers 
            can see detailed error information in development mode.
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            <strong>Button Differences:</strong><br/>
            • <strong>Try Again:</strong> Resets the error boundary and retries the failed operation<br/>
            • <strong>Go Home:</strong> Navigates away to the home page
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

// Button Differences!
// 🔄 "Try Again" Button:
// Uses: reset() function from Next.js error boundary
// What it does: Resets the error boundary and attempts to re-render the failed component
// Best for: Temporary errors that might resolve on retry

// 🏠 "Go Home" Button:
// Uses: window.location.href = '/'
// What it does: Navigates away from the error to the home page
// Best for: When user wants to abandon the failed operation


// How to Test the Error Page
// Added a test button to your home page. Here are the testing methods:

// Method 1: Test Button (Easiest)
// Go to home page (/)
// Click "Test Error Page" button
// You'll see your custom error page with:
// Error icon and message
// Development mode: Full error details
// Try Again button to reset
// Go Home button to navigate away

// Method 2: Browser Console
// Open browser dev tools (F12)
// In console, type: throw new Error("Test error")
// Press Enter - triggers error boundary

// Method 3: Component Error
// Create a component with an intentional error:

// Add this temporarily to any component
// const broken = null;
// broken.someProperty; // This will trigger error

// What You'll See:
// Development Mode:
// ✅ Full error details: Message, stack trace, error ID
// ✅ Error boundary UI: Your custom design
// ✅ Reset functionality: Try again button works

// Production Mode:
// ✅ User-friendly: Generic error message
// ✅ No sensitive info: No stack traces exposed
// ✅ Same UI: Consistent error handling

// Test Features:
// Error message display
// Reset button functionality
// Navigation back to home
// Development vs Production differences