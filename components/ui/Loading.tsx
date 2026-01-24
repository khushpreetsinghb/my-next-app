"use client";

import { CircularProgress, Box, Typography } from "@mui/material";

interface LoadingProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  height?: string | number;
}

export default function Loading({ 
  size = 40, 
  message = "Loading...", 
  fullScreen = false,
  height = "auto" 
}: LoadingProps) {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={fullScreen ? "min-h-screen" : ""}
      style={{ minHeight: height === "auto" ? "200px" : height }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" className="mt-4 text-gray-600">
          {message}
        </Typography>
      )}
    </Box>
  );

  return content;
}

// The Loading.tsx component can be used in two ways:

// 1. Automatic loading.tsx file (create in /app)
// inside the same folder as error/ page-not-found

// 2. Manual usage (better - reusable):

// import Loading from "@/components/ui/Loading";
// In any component:
// <Loading size={60} message="Loading..." fullScreen={true} />

// Loading Component Location
// You have two options for loading:

// Option A: Automatic app/loading.tsx (File-based)
// Create: app/loading.tsx
// Next.js automatically shows this during data fetching
// Scope: Applies to entire app
// Option B: Manual Import (Current approach)
// Keep: components/ui/Loading.tsx
// Import manually where needed
// More flexible for specific loading states
// Current setup is fine - you're using Option B which is more flexible.

// Benefits of This Approach:
// Reusable: Use anywhere in your app
// No duplication: Single source of truth
// TypeScript: Full type safety
// Flexible: Different props for different use cases