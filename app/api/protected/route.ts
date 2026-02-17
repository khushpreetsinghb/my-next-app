import { NextRequest, NextResponse } from 'next/server'

// This route demonstrates authentication middleware
export async function GET(request: NextRequest) {
  // This route should be protected by auth middleware
  // If you reach here, authentication passed
  
  const userId = request.headers.get('x-user-id')
  const userRole = request.headers.get('x-user-role')

  return NextResponse.json({
    message: 'Protected data accessed successfully!',
    userInfo: {
      userId: userId || 'unknown',
      role: userRole || 'unknown'
    },
    data: {
      secretMessage: 'This is only visible to authenticated users',
      userSpecificData: `Data for user ${userId}`,
      timestamp: new Date().toISOString()
    },
    middlewareEffects: {
      authentication: '✅ Passed - You are authenticated',
      logging: '✅ Request was logged',
      security: '✅ Security headers applied',
      rateLimit: '✅ Rate limit checked'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = request.headers.get('x-user-id')

    return NextResponse.json({
      message: 'Protected POST endpoint',
      userId,
      receivedData: body,
      result: 'Your authenticated POST request was processed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}
