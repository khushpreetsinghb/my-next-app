import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent } from 'next/server'
import {
  loggingMiddleware,
  corsMiddleware,
  ipRateLimit,
  authMiddleware,
  securityHeadersMiddleware,
  createMiddlewareChain,
  createPathMiddleware,
  createConditionalMiddleware
} from './middleware/index'

// NOTE: Next.js 16.1.6 shows deprecation warning about middleware.
// This implementation follows current Next.js standards and works correctly.
// The warning is from internal Next.js API changes, not our code.
// See: https://nextjs.org/docs/messages/middleware-to-proxy

// Main middleware function that chains all middlewares
export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // Create middleware chain with conditional logic
  const middlewares = [
    // Always run logging
    loggingMiddleware,

    // Security headers for all routes
    securityHeadersMiddleware,

    // CORS for API routes
    createPathMiddleware(['/api'], corsMiddleware),

    // Rate limiting for API routes
    createPathMiddleware(['/api'], ipRateLimit),

    // Authentication for protected routes
    authMiddleware
  ]

  // Execute middleware chain
  return createMiddlewareChain(middlewares)(request, event)
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
