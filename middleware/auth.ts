import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware } from 'next/server'

// Authentication Middleware
export const authMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  // Paths that don't require authentication
  const publicPaths = ['/login', '/register', '/api/auth', '/', '/about']
  const { pathname } = request.nextUrl
  
  // Skip auth for public paths and static assets
  if (publicPaths.some(path => pathname.startsWith(path)) || 
      pathname.includes('/_next') || 
      pathname.includes('/favicon.ico') ||
      pathname.includes('/public')) {
    return NextResponse.next()
  }

  // Check for auth token in header or cookie
  const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                request.cookies.get('auth-token')?.value

  if (!token) {
    // For API routes, return 401
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          message: 'Please provide a valid token in Authorization header or auth-token cookie'
        },
        { status: 401 }
      )
    }
    
    // For page routes, redirect to login
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Validate token (in real app, you'd verify with JWT or database)
  try {
    // For demo, we'll accept any non-empty token
    // In production, you'd decode and verify JWT here
    if (token === 'expired-token') {
      throw new Error('Token expired')
    }
    
    if (token === 'invalid-token') {
      throw new Error('Invalid token')
    }

    // Add user info to request headers for downstream use
    const response = NextResponse.next()
    response.headers.set('x-user-id', 'demo-user-123')
    response.headers.set('x-user-role', 'user')
    
    return response
  } catch (error) {
    // Token validation failed
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { 
          error: 'Invalid or expired token',
          message: 'Please authenticate again'
        },
        { status: 401 }
      )
    }
    
    // Clear invalid token cookie and redirect
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

// Role-based access control middleware
export const rbacMiddleware = (requiredRoles: string[]): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const userRole = request.headers.get('x-user-role')
    
    if (!userRole || !requiredRoles.includes(userRole)) {
      return NextResponse.json(
        { 
          error: 'Access denied',
          message: `Required roles: ${requiredRoles.join(', ')}`
        },
        { status: 403 }
      )
    }
    
    return NextResponse.next()
  }
}

// Admin-only middleware
export const adminMiddleware = rbacMiddleware(['admin', 'superadmin'])

// Moderator middleware
export const moderatorMiddleware = rbacMiddleware(['admin', 'moderator'])
