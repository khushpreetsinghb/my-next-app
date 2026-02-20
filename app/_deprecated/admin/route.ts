import { NextRequest, NextResponse } from 'next/server'

// This route demonstrates admin-only middleware
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  const userRole = request.headers.get('x-user-role')

  // This should only be accessible to admin users
  return NextResponse.json({
    message: 'Admin panel data',
    adminInfo: {
      userId: userId || 'unknown',
      role: userRole || 'unknown',
      accessLevel: 'ADMIN'
    },
    adminData: {
      totalUsers: 1234,
      activeSessions: 56,
      systemStatus: 'healthy',
      lastBackup: new Date().toISOString(),
      adminFeatures: [
        'User management',
        'System monitoring',
        'Security settings',
        'Analytics dashboard'
      ]
    },
    securityInfo: {
      middlewareEffects: [
        '✅ Authentication required',
        '✅ Admin role verified',
        '✅ Rate limiting applied',
        '✅ Security headers added',
        '✅ Request logged'
      ]
    }
  })
}

export async function DELETE(request: NextRequest) {
  // Example of a sensitive admin operation
  return NextResponse.json({
    message: 'Admin DELETE operation',
    operation: 'User deletion (demo only)',
    timestamp: new Date().toISOString(),
    security: 'This operation requires admin privileges and is logged'
  })
}
