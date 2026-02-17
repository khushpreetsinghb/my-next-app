import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware } from 'next/server'

// Request logging middleware
export const loggingMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const start = Date.now()
  const timestamp = new Date().toISOString()
  const method = request.method
  const url = request.url
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || 'direct'
  
  // Get client IP
  const ip = getClientIP(request)
  
  // Log request details
  console.log(`\n📝 [${timestamp}] ${method} ${url}`)
  console.log(`🌐 IP: ${ip}`)
  console.log(`🔍 User-Agent: ${userAgent}`)
  console.log(`🔗 Referer: ${referer}`)
  
  // Log headers (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('📦 Headers:', Object.fromEntries(request.headers.entries()))
  }
  
  // Log body for POST/PUT requests (only in development)
  if (process.env.NODE_ENV === 'development' && 
      (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    try {
      const body = await request.clone().text()
      if (body) {
        console.log('📄 Request Body:', body.substring(0, 500) + (body.length > 500 ? '...' : ''))
      }
    } catch (error) {
      console.log('📄 Request Body: [Unable to read]')
    }
  }
  
  // Store start time for response time calculation
  request.headers.set('x-request-start', start.toString())
  
  return NextResponse.next()
}

// Response logging middleware (runs after request)
export const responseLoggingMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const response = NextResponse.next()
  
  // Calculate response time
  const start = parseInt(request.headers.get('x-request-start') || '0')
  const duration = Date.now() - start
  
  // Log response details
  console.log(`✅ Response in ${duration}ms`)
  console.log(`📊 Status: Will be set by Next.js`)
  
  return response
}

// Error logging middleware
export const errorLoggingMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  try {
    return NextResponse.next()
  } catch (error) {
    const timestamp = new Date().toISOString()
    console.error(`❌ [${timestamp}] Error in ${request.method} ${request.url}:`, error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        timestamp,
        requestId: generateRequestId()
      },
      { status: 500 }
    )
  }
}

// API-specific logging middleware
export const apiLoggingMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const { pathname } = request.nextUrl
  
  // Only log API routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  
  const timestamp = new Date().toISOString()
  const method = request.method
  const apiPath = pathname.replace('/api', '')
  
  console.log(`\n🔌 API Call [${timestamp}] ${method} ${apiPath}`)
  
  // Log API key if present
  const apiKey = request.headers.get('x-api-key')
  if (apiKey) {
    console.log(`🔑 API Key: ${apiKey.substring(0, 8)}...`)
  }
  
  // Log rate limit info
  const rateLimit = request.headers.get('x-ratelimit-limit')
  const rateRemaining = request.headers.get('x-ratelimit-remaining')
  if (rateLimit && rateRemaining) {
    console.log(`⏱️ Rate Limit: ${rateRemaining}/${rateLimit}`)
  }
  
  return NextResponse.next()
}

// Helper functions
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  const ip = forwarded?.split(',')[0] || 
             realIP || 
             cfConnectingIP || 
             '127.0.0.1'
  
  return ip.trim()
}

function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// Performance monitoring middleware
export const performanceMiddleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const start = performance.now()
  const timestamp = new Date().toISOString()
  
  // Add performance tracking header
  const response = NextResponse.next()
  request.headers.set('x-perf-start', start.toString())
  
  // Log slow requests (>1000ms)
  event.waitUntil(
    (async () => {
      // This would normally be handled in a response middleware
      // For demo purposes, we'll just log the start
      console.log(`⚡ Performance tracking started for ${request.url}`)
    })()
  )
  
  return response
}
