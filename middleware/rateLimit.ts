import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware } from 'next/server'

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  message?: string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// In-memory rate limit store (in production, use Redis or database)
const rateLimitStore = new Map<string, {
  count: number
  resetTime: number
  lastRequest: number
}>()

// Basic rate limiting middleware
export const rateLimitMiddleware = (config: RateLimitConfig): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const key = getRateLimitKey(request)
    const now = Date.now()
    
    // Clean up expired entries
    cleanupExpiredEntries(now)
    
    // Get current rate limit data
    const current = rateLimitStore.get(key)
    
    if (current && now < current.resetTime) {
      // Window is still active
      if (current.count >= config.maxRequests) {
        // Rate limit exceeded
        const response = NextResponse.json(
          {
            error: 'Too many requests',
            message: config.message || `Rate limit exceeded. Max ${config.maxRequests} requests per ${config.windowMs / 1000} seconds.`,
            retryAfter: Math.ceil((current.resetTime - now) / 1000),
            limit: config.maxRequests,
            windowMs: config.windowMs
          },
          { status: 429 }
        )
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
        response.headers.set('X-RateLimit-Remaining', '0')
        response.headers.set('X-RateLimit-Reset', current.resetTime.toString())
        response.headers.set('Retry-After', Math.ceil((current.resetTime - now) / 1000).toString())
        
        return response
      }
      
      // Increment counter
      current.count++
      current.lastRequest = now
    } else {
      // New window or expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
        lastRequest: now
      })
    }
    
    // Add rate limit headers to response
    const response = NextResponse.next()
    const updated = rateLimitStore.get(key)!
    const remaining = Math.max(0, config.maxRequests - updated.count)
    
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', updated.resetTime.toString())
    
    return response
  }
}

// Rate limiting by IP
export const ipRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  message: 'Too many requests from this IP'
})

// Rate limiting by user ID (for authenticated users)
export const userRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 200,
  message: 'Too many requests for this user'
})

// Strict rate limiting for sensitive endpoints
export const strictRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10,
  message: 'Rate limit exceeded for this sensitive operation'
})

// API-specific rate limiting
export const apiRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
  message: 'API rate limit exceeded'
})

// Login rate limiting (to prevent brute force)
export const loginRateLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many login attempts. Please try again later.'
})

// Password reset rate limiting
export const passwordResetRateLimit = rateLimitMiddleware({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  message: 'Too many password reset attempts. Please try again later.'
})

// Progressive rate limiting (gets stricter with repeated violations)
export const progressiveRateLimit: NextMiddleware = async (request: NextRequest, event: NextFetchEvent) => {
  const key = `progressive:${getRateLimitKey(request)}`
  const now = Date.now()
  
  cleanupExpiredEntries(now)
  
  const current = rateLimitStore.get(key)
  
  if (current && now < current.resetTime) {
    const violations = current.count
    const baseLimit = 100
    const baseWindow = 60 * 1000
    
    // Make it stricter with each violation
    const multiplier = Math.pow(2, violations - 1)
    const maxRequests = Math.max(1, Math.floor(baseLimit / multiplier))
    const windowMs = baseWindow * multiplier
    
    if (current.count >= maxRequests) {
      return NextResponse.json(
        {
          error: 'Progressive rate limit exceeded',
          message: `Too many violations. Current limit: ${maxRequests} requests per ${windowMs / 1000} seconds.`,
          violations,
          retryAfter: Math.ceil((current.resetTime - now) / 1000)
        },
        { status: 429 }
      )
    }
    
    current.count++
  } else {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + (60 * 1000),
      lastRequest: now
    })
  }
  
  return NextResponse.next()
}

// Rate limiting by endpoint
export const createEndpointRateLimit = (endpointLimits: Record<string, RateLimitConfig>): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { pathname } = request.nextUrl
    
    // Find matching endpoint configuration
    const matchingEndpoint = Object.keys(endpointLimits).find(endpoint => 
      pathname.startsWith(endpoint)
    )
    
    if (!matchingEndpoint) {
      return NextResponse.next()
    }
    
    const config = endpointLimits[matchingEndpoint]
    const middleware = rateLimitMiddleware(config)
    
    return middleware(request, event)
  }
}

// Rate limiting with different tiers
export const tieredRateLimit: NextMiddleware = async (request: NextRequest, event: NextFetchEvent) => {
  const userTier = request.headers.get('x-user-tier') || 'free'
  const key = `tier:${userTier}:${getRateLimitKey(request)}`
  
  const tierConfigs = {
    free: { windowMs: 60 * 1000, maxRequests: 30 },
    basic: { windowMs: 60 * 1000, maxRequests: 100 },
    premium: { windowMs: 60 * 1000, maxRequests: 500 },
    enterprise: { windowMs: 60 * 1000, maxRequests: 2000 }
  }
  
  const config = tierConfigs[userTier as keyof typeof tierConfigs] || tierConfigs.free
  const middleware = rateLimitMiddleware(config)
  
  return middleware(request, event)
}

// Helper functions
export function getRateLimitKey(request: NextRequest): string {
  // Try to get user ID first (for authenticated users)
  const userId = request.headers.get('x-user-id') || 
                 request.cookies.get('user-id')?.value
  
  if (userId) {
    return `user:${userId}`
  }
  
  // Fall back to IP address
  const ip = getClientIP(request)
  return `ip:${ip}`
}

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

function cleanupExpiredEntries(now: number): void {
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Rate limiting statistics middleware
export const rateLimitStats: NextMiddleware = async (request: NextRequest, event: NextFetchEvent) => {
  const { pathname } = request.nextUrl
  
  // Only show stats for specific route
  if (pathname !== '/api/rate-limit-stats') {
    return NextResponse.next()
  }
  
  const stats = {
    totalEntries: rateLimitStore.size,
    entries: Array.from(rateLimitStore.entries()).map(([key, data]) => ({
      key: key.split(':')[0], // Only show type (user/ip)
      count: data.count,
      resetTime: new Date(data.resetTime).toISOString(),
      timeRemaining: Math.max(0, data.resetTime - Date.now())
    }))
  }
  
  return NextResponse.json(stats)
}
