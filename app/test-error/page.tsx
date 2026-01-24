"use client";

import { useEffect } from "react";
import { Container, Typography } from "@mui/material";

export default function TestErrorPage() {
  useEffect(() => {
    // Trigger error after component mounts
    throw new Error("This is a test error from a dedicated test page!");
  }, []);

  return (
    <Container>
      <Typography>This page should trigger an error</Typography>
    </Container>
  );
}

// Fixed Error Testing!
// Updated the error testing approach. Here are the working methods:

// Method 1: Updated Test Button (Now Fixed)
// Go to home page (/)
// Click "Test Error Page" button
// Should now work - I changed it to use React state instead of throwing in event handler

// Method 2: Dedicated Test Page (New)
// Visit /test-error
// Error triggers automatically when page loads
// Shows your error page immediately

// Method 3: Console (Alternative)
// Open browser dev tools (F12)
// In console, type:
// window.location.href = '/test-error'

// Why the Original Didn't Work:
// ❌ Before - Error in event handler doesn't trigger boundary
// const triggerError = () => {
//   throw new Error("Test"); // Caught by event handler, not boundary
// };
// ✅ After - Error in render triggers boundary
// if (shouldError) {
//   throw new Error("Test"); // Caught by error boundary
// }

// Test Now:
// Try the button on home page
// Visit /test-error directly
// Both should show your custom error page with:
// Red error icon
// "Something went wrong!" message
// Error details (in development)
// Try Again and Go Home buttons