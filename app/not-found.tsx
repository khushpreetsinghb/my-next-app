"use client";

import Link from "next/link";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { HomeIcon, SearchIcon } from "lucide-react";

export default function NotFound() {
  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={3} className="p-8 text-center">
        <Box className="mb-6">
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: 'text.secondary',
              opacity: 0.3,
            }}
          >
            404
          </Typography>
        </Box>

        <Box className="mb-4">
          <Typography variant="h4" component="h1">
            Page Not Found
          </Typography>
        </Box>

        <Box className="mb-8">
          <Typography variant="body1" className="text-gray-600 text-center">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track!
          </Typography>
        </Box>
        {/* // ❌ Before - Typography didn't respect margin
        <Typography className="mb-8 text-gray-600">
          Text content
        </Typography>
        // ✅ After - Box applies margin correctly
        <Box className="mb-8">
          <Typography className="text-gray-600">
            Text content
          </Typography>
        </Box> */}

        <Box className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            component={Link}
            href="/"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            component={Link}
            href="/blog"
          >
            Browse Blog
          </Button>
        </Box>

        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/"
            className="block"
          >
            <Box className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <Typography variant="h6" className="mb-2 text-blue-800">
                🏠 Home
              </Typography>
              <Typography variant="body2" className="text-blue-600">
                Return to the main page
              </Typography>
            </Box>
          </Link>

          <Link
            href="/blog"
            className="block"
          >
            <Box className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <Typography variant="h6" className="mb-2 text-green-800">
                📝 Blog
              </Typography>
              <Typography variant="body2" className="text-green-600">
                Read our latest posts
              </Typography>
            </Box>
          </Link>

          <Link
            href="/about"
            className="block"
          >
            <Box className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
              <Typography variant="h6" className="mb-2 text-purple-800">
                ℹ️ About
              </Typography>
              <Typography variant="body2" className="text-purple-600">
                Learn about this project
              </Typography>
            </Box>
          </Link>
        </Box>

        <Box className="mt-8 p-4 bg-gray-50 rounded-lg">
          <Typography variant="h6" className="mb-2">
            📌 Not-Found Component Demonstration
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            This 404 page automatically appears when users visit non-existent routes.
            Try visiting: <code className="bg-gray-200 px-1 rounded">/non-existent-page</code>
            or <code className="bg-gray-200 px-1 rounded">/blog/invalid-post</code>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

// Not-Found File Names
// Next.js has specific reserved filenames that it automatically detects:

// ✅ Valid Not-Found Files:
// app/
// ├── not-found.tsx    ← Correct (Next.js standard)
// ├── not-found.jsx    ← Correct (JSX version)
// └── not-found.js     ← Correct (JavaScript version)

// ❌ Invalid Names (Won't work):
// app/
// ├── 404.tsx          ← ❌ Not recognized
// ├── page-not-found.tsx ← ❌ Not recognized
// ├── error404.tsx      ← ❌ Not recognized
// └── missing.tsx       ← ❌ Not recognized

// How Next.js Detects Special Files:
// File Name	  Purpose	Automatically Used
// layout.tsx	  Layout wrapper	✅
// template.tsx	  Template wrapper	✅
// page.tsx	Page  content	        ✅
// loading.tsx	  Loading state	    ✅
// error.tsx	  Error boundary	✅
// not-found.tsx  404 page	        ✅
// route.ts	      API endpoint      ✅

// Current Setup is Correct:
// ✅ app/not-found.tsx - Will automatically show for 404s
// ✅ app/error.tsx - Will automatically catch errors
// ✅ components/ui/Loading.tsx - Manual import (flexible)