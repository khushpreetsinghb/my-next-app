"use client";

import { useState } from "react";
import { Button, Box } from "@mui/material";
import { BugReport } from "@mui/icons-material";

export default function ErrorTestButton() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error("This is a test error to demonstrate the error page functionality!");
  }

  return (
    <Box className="text-center">
      <Button
        variant="contained"
        color="error"
        startIcon={<BugReport />}
        onClick={() => setShouldError(true)}
        className="mb-4"
      >
        Test Error Page
      </Button>
    </Box>
  );
}

// Why Console Shows Errors:

// 1. Error Boundary Mechanism
// When an error occurs in React:

// Error is thrown in the component
// Console logs the error (browser's default behavior)
// Error boundary catches the error
// Your custom error page displays instead

// 2. Browser's Default Behavior
// Browsers always log errors to console regardless of error boundaries:

// Development: Detailed stack traces
// Production: Basic error messages
// This is intentional for debugging

// What You're Seeing:
// VM2532 <anonymous>:1 Error: This is a test error from a dedicated test page!
//     at TestErrorPage.useEffect (page.tsx:9:11)
 
// The above error occurred in the <TestErrorPage> component. 
// It was handled by the <ErrorBoundaryHandler> error boundary.
// Translation:
// First line: Browser's native error logging
// Second line: React's error boundary confirmation

// This is Good Because:
// ✅ Error boundary is working - caught and handled
// ✅ Console logging helps developers debug
// ✅ Users see friendly UI instead of browser crashes
// ✅ Production users won't see console (only developers)

// In Production:
// Users: See your nice error page
// Developers: Still see console for debugging
// No white screens or browser crashes