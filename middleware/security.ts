import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware } from 'next/server'

// Security headers middleware
export const securityHeadersMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const response = NextResponse.next()
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.example.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // Permissions Policy
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()'
  ].join(', ')
  
  response.headers.set('Permissions-Policy', permissionsPolicy)
  
  // Strict Transport Security (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  
  return response
}

// Input validation middleware
export const inputValidationMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const { pathname } = request.nextUrl
  
  // Only validate API routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  
  const method = request.method
  const contentType = request.headers.get('content-type')
  
  // Validate content type for POST/PUT requests
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && 
      (!contentType || !contentType.includes('application/json'))) {
    return NextResponse.json(
      { error: 'Invalid content type. Expected application/json' },
      { status: 400 }
    )
  }
  
  // Check for common attack patterns
  const url = request.url.toLowerCase()
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // XSS
    /union.*select/gi, // SQL injection
    /drop\s+table/gi, // SQL injection
    /javascript:/gi, // JS injection
    /on\w+\s*=/gi // Event handlers
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      console.warn('Suspicious pattern detected in URL:', url)
      
      return NextResponse.json(
        { error: 'Invalid request detected' },
        { status: 400 }
      )
    }
  }
  
  // Validate request body for POST/PUT requests
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    try {
      const body = await request.clone().text()
      
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(body)) {
          console.warn('Suspicious pattern detected in body:', body.substring(0, 100))
          
          return NextResponse.json(
            { error: 'Invalid input detected' },
            { status: 400 }
          )
        }
      }
    } catch (error) {
      // Body parsing failed, but that's okay for validation middleware
    }
  }
  
  return NextResponse.next()
}

// Bot detection middleware
export const botDetectionMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const userAgent = request.headers.get('user-agent') || ''
  const ip = getClientIP(request)
  
  // List of known bot user agents
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /node/i,
    /go-http/i,
    /postman/i,
    /insomnia/i
  ]
  
  const isBot = botPatterns.some(pattern => pattern.test(userAgent))
  
  if (isBot) {
    console.log(`Bot detected: ${userAgent} from ${ip}`)
    
    // You could implement different strategies:
    // 1. Allow but with rate limiting
    // 2. Block completely
    // 3. Return different content
    
    // For demo, we'll add a header and continue
    const response = NextResponse.next()
    response.headers.set('X-Bot-Detected', 'true')
    return response
  }
  
  return NextResponse.next()
}

// IP blocking middleware
export const ipBlockingMiddleware = (blockedIPs: string[]): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const ip = getClientIP(request)
    
    if (blockedIPs.includes(ip)) {
      console.log(`Blocked IP attempted access: ${ip}`)
      
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }
    
    return NextResponse.next()
  }
}

// Request size limiting middleware
export const requestSizeLimitMiddleware = (maxSizeBytes: number): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const contentLength = request.headers.get('content-length')
    
    if (contentLength && parseInt(contentLength) > maxSizeBytes) {
      return NextResponse.json(
        { 
          error: 'Request too large',
          maxSize: maxSizeBytes,
          receivedSize: contentLength
        },
        { status: 413 }
      )
    }
    
    return NextResponse.next()
  }
}

// API key validation middleware
export const apiKeyMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const { pathname } = request.nextUrl
  
  // Only require API key for certain routes
  const protectedRoutes = ['/api/admin', '/api/sensitive']
  const needsApiKey = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!needsApiKey) {
    return NextResponse.next()
  }
  
  const apiKey = request.headers.get('x-api-key') ||
                 request.nextUrl.searchParams.get('api_key')
  
  // In production, validate against database
  const validApiKeys = [
    'sk-demo-test-key-123',    // Replace with real keys in production
    'sk-demo-prod-key-456'     // Replace with real keys in production
  ]
  
  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return NextResponse.json(
      { 
        error: 'Invalid or missing API key',
        message: 'Please provide a valid API key in x-api-key header or api_key parameter'
      },
      { status: 401 }
    )
  }
  
  // Add API key info to headers
  const response = NextResponse.next()
  response.headers.set('X-API-Key-Type', apiKey.includes('prod') ? 'production' : 'test')
  
  return response
}

// Request timing middleware (to detect slow requests)
export const requestTimingMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const start = Date.now()
  
  // Store start time
  request.headers.set('x-request-start', start.toString())
  
  // Log slow requests asynchronously
  event.waitUntil(
    (async () => {
      // This would normally be handled in response middleware
      // For demo, we'll just track the start
      console.log(`Request started: ${request.method} ${request.url}`)
    })()
  )
  
  return NextResponse.next()
}

// Helper function to get client IP
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0] || 
             realIP || 
             cfConnectingIP || 
             '127.0.0.1'
  
  return ip.trim()
}

// Combined security middleware
export const securityMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  // Apply all security middlewares in sequence
  const middlewares = [
    securityHeadersMiddleware,
    inputValidationMiddleware,
    botDetectionMiddleware,
    requestTimingMiddleware
  ]
  
  for (const middleware of middlewares) {
    const result = await middleware(request, event)
    
    // If any middleware returns a response, stop the chain
    if (result && result !== NextResponse.next()) {
      return result
    }
  }
  
  return NextResponse.next()
}
