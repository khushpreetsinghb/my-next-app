import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware } from 'next/server'

// CORS configuration
const corsConfig = {
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-API-Key',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Request-ID'],
  maxAge: 86400, // 24 hours
  credentials: true
}

// Basic CORS middleware
export const corsMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const origin = request.headers.get('origin')
  const method = request.method
  
  // Handle preflight requests
  if (method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    
    // Set CORS headers for preflight
    if (origin && corsConfig.allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set('Access-Control-Allow-Methods', corsConfig.allowedMethods.join(', '))
    response.headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '))
    response.headers.set('Access-Control-Max-Age', corsConfig.maxAge.toString())
    response.headers.set('Access-Control-Allow-Credentials', corsConfig.credentials.toString())
    
    return response
  }
  
  // For actual requests, we'll add CORS headers in the response
  return NextResponse.next()
}

// CORS middleware that adds headers to response
export const corsResponseMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()
  
  // Add CORS headers to response
  if (origin && corsConfig.allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  
  response.headers.set('Access-Control-Allow-Credentials', corsConfig.credentials.toString())
  response.headers.set('Access-Control-Expose-Headers', corsConfig.exposedHeaders.join(', '))
  
  return response
}

// Strict CORS middleware (for API routes only)
export const strictCorsMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin')
  
  // Only apply to API routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  
  // Check if origin is allowed
  if (!origin || !corsConfig.allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { 
        error: 'CORS error',
        message: 'Origin not allowed',
        allowedOrigins: corsConfig.allowedOrigins
      },
      { status: 403 }
    )
  }
  
  return corsResponseMiddleware(request, event)
}

// Permissive CORS middleware (for development)
export const devCorsMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.next()
  }
  
  const origin = request.headers.get('origin')
  const response = NextResponse.next()
  
  // Allow all origins in development
  response.headers.set('Access-Control-Allow-Origin', origin || '*')
  response.headers.set('Access-Control-Allow-Methods', '*')
  response.headers.set('Access-Control-Allow-Headers', '*')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  
  return response
}

// CORS middleware with origin validation
export const validateOriginMiddleware = (allowedOrigins: string[]): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    
    // Allow requests without origin (same-origin)
    if (!origin) {
      return NextResponse.next()
    }
    
    // Check if origin is in allowed list
    if (!allowedOrigins.some(allowed => origin === allowed || origin.endsWith(allowed))) {
      return NextResponse.json(
        { 
          error: 'Origin not allowed',
          origin,
          allowedOrigins
        },
        { status: 403 }
      )
    }
    
    return NextResponse.next()
  }
}

// CORS middleware for specific routes
export const routeSpecificCors = {
  // CORS for public APIs
  publicApi: async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    return response
  },
  
  // CORS for authenticated APIs
  authApi: async (request: NextRequest, event: NextFetchEvent) => {
    const origin = request.headers.get('origin')
    const response = NextResponse.next()
    
    if (origin && corsConfig.allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    
    return response
  }
}

// Helper function to create custom CORS middleware
export const createCorsMiddleware = (options: Partial<typeof corsConfig>) => {
  const config = { ...corsConfig, ...options }
  
  return async (request: NextRequest, event: NextFetchEvent): Promise<NextResponse> => {
    const origin = request.headers.get('origin')
    const method = request.method
    
    if (method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 })
      
      if (origin && config.allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
      
      response.headers.set('Access-Control-Allow-Methods', config.allowedMethods.join(', '))
      response.headers.set('Access-Control-Allow-Headers', config.allowedHeaders.join(', '))
      response.headers.set('Access-Control-Max-Age', config.maxAge.toString())
      response.headers.set('Access-Control-Allow-Credentials', config.credentials.toString())
      
      return response
    }
    
    const response = NextResponse.next()
    
    if (origin && config.allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set('Access-Control-Allow-Credentials', config.credentials.toString())
    response.headers.set('Access-Control-Expose-Headers', config.exposedHeaders.join(', '))
    
    return response
  }
}
