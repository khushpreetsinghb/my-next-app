import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate fresh data that changes on every request
  const freshData = {
    users: [
      {
        id: Math.floor(Math.random() * 1000),
        name: `User ${Math.floor(Math.random() * 100)}`,
        email: `user${Math.floor(Math.random() * 100)}@example.com`,
        lastActive: new Date().toISOString(),
        status: Math.random() > 0.5 ? 'online' : 'offline'
      },
      {
        id: Math.floor(Math.random() * 1000),
        name: `User ${Math.floor(Math.random() * 100)}`,
        email: `user${Math.floor(Math.random() * 100)}@example.com`,
        lastActive: new Date().toISOString(),
        status: Math.random() > 0.5 ? 'online' : 'offline'
      }
    ],
    serverStats: {
      timestamp: new Date().toISOString(),
      uptime: Math.floor(Math.random() * 86400),
      activeConnections: Math.floor(Math.random() * 100),
      memoryUsage: `${(Math.random() * 100).toFixed(2)}%`
    }
  }

  return NextResponse.json({
    data: freshData,
    timestamp: new Date().toISOString(),
    message: 'Fresh data from server (SSR)',
    status: 200,
  })
}
