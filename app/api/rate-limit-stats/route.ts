import { NextRequest, NextResponse } from 'next/server'
import { rateLimitStats } from '../../../middleware/rateLimit'

// This route shows rate limiting statistics
export async function GET(request: NextRequest) {
  // Use the rate limit stats middleware to get current stats
  const statsResponse = await rateLimitStats(request, {} as any)
  
  if (statsResponse && statsResponse !== NextResponse.next()) {
    return statsResponse
  }

  // Fallback stats if middleware doesn't return data
  return NextResponse.json({
    message: 'Rate Limiting Statistics',
    timestamp: new Date().toISOString(),
    stats: {
      activeLimits: 'Check middleware console logs',
      middlewareStatus: 'Active',
      features: [
        'IP-based rate limiting',
        'User-based rate limiting',
        'Progressive rate limiting',
        'Tiered rate limiting',
        'Endpoint-specific limits'
      ]
    },
    endpoints: {
      '/api/middleware-demo': '100 requests/minute',
      '/api/protected': '200 requests/minute (authenticated users)',
      '/api/admin': '10 requests/minute (admin only)',
      '/api/login': '5 requests/15 minutes'
    },
    tips: [
      'Make rapid requests to see rate limiting in action',
      'Check response headers for X-RateLimit-* values',
      'Different endpoints have different limits',
      'Authenticated users have higher limits'
    ]
  })
}
