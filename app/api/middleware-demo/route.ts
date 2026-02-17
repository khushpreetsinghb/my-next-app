import { NextRequest, NextResponse } from 'next/server'

// Demo API route to showcase middleware functionality
export async function GET(request: NextRequest) {
  // This route will be affected by all middlewares:
  // - Logging (will log the request)
  // - CORS (will add CORS headers)
  // - Rate limiting (will limit requests)
  // - Authentication (will require auth token)
  // - Security headers (will add security headers)

  // Get request information to show middleware effects
  const headers = Object.fromEntries(request.headers.entries())
  const userAgent = request.headers.get('user-agent')
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  // Check if authentication middleware added user info
  const userId = request.headers.get('x-user-id')
  const userRole = request.headers.get('x-user-role')

  // Check rate limit headers
  const rateLimit = request.headers.get('x-ratelimit-limit')
  const rateRemaining = request.headers.get('x-ratelimit-remaining')

  return NextResponse.json({
    message: 'Middleware demo successful!',
    timestamp: new Date().toISOString(),
    requestInfo: {
      method: request.method,
      url: request.url,
      userAgent,
      ip,
      headers: {
        // Show relevant headers that middleware might have added
        authorization: headers.authorization ? '[REDACTED]' : 'none',
        'x-user-id': userId || 'none',
        'x-user-role': userRole || 'none',
        'x-api-key': headers['x-api-key'] ? '[REDACTED]' : 'none',
        'x-ratelimit-limit': rateLimit || 'none',
        'x-ratelimit-remaining': rateRemaining || 'none',
        'x-bot-detected': headers['x-bot-detected'] || 'false'
      }
    },
    middlewareEffects: {
      logging: 'Request was logged to console',
      cors: 'CORS headers were added',
      rateLimit: rateLimit ? `Rate limit: ${rateRemaining}/${rateLimit}` : 'No rate limit info',
      authentication: userId ? `Authenticated as user ${userId}` : 'Not authenticated',
      security: 'Security headers were added'
    },
    tips: [
      'Check the browser console for logging output',
      'Look at the response headers in browser dev tools',
      'Try making rapid requests to see rate limiting',
      'Test with/without Authorization header',
      'Check security headers like X-Frame-Options, CSP, etc.'
    ]
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: 'POST request processed',
      receivedData: body,
      timestamp: new Date().toISOString(),
      middlewareInfo: 'This POST request went through all middlewares'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
