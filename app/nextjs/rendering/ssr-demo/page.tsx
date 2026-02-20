import SSRExample from '@/components/SSRExample'
import RenderingComparison from '@/components/RenderingComparison'

// This is a Server Component that demonstrates SSR
export default async function SSRPage() {
  // Fetch fresh data on every request (no cache)
  let apiData: { data: any } = { data: null }
  
  try {
    const res = await fetch('/api/ssr-demo', {
      cache: 'no-store', // This forces SSR - no caching
    })
    // Why /api/ssr-demo works on the server
    // Because:
    // This code runs in a Server Component
    // Next.js knows the same server is hosting the API route
    // Next automatically resolves /api/... internally (no full URL needed)
    
    // 📌 On the client, you’d need:
    // fetch('http://localhost:3000/api/ssr-demo')
    
    if (res.ok) {
      apiData = await res.json()
    } else {
      console.error('API request failed:', res.status)
      console.error('API request failed:', res.status, res.statusText)
      // Try to get error details
      const errorText = await res.text()
      console.error('Error response:', errorText)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // Fallback data - only used when API fails
    apiData = {
      data: {
        users: [],
        serverStats: {
          timestamp: new Date().toISOString(),
          uptime: 0,
          activeConnections: 0,
          memoryUsage: '0%'
        }
      }
    }
  }

// You're seeing the fallback data initially because the API request is failing on the first load,
// but succeeding on the refresh. This happens because:

// Initial Load: The server component tries to fetch from /api/ssr-demo
// but it fails (likely due to timing or server startup), so it uses the fallback data

// Refresh Button: The client-side fetch works because the server is fully running

// Why This Happens:
// Server Component (Initial Load): Runs on the server during page render
// Tries to fetch /api/ssr-demo
// If API isn't ready or fails → uses fallback data
// Client Component (Refresh Button): Runs in browser after page loads
// Server is fully running by then
// API call succeeds → gets random data

// 🔍 Common Causes:
// Server startup timing: API routes might not be ready when server component renders
// Network issues: Server-side fetch might have different network constraints
// Development server: Sometimes API routes take time to initialize


  const timestamp = new Date().toISOString()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Server-Side Rendering (SSR) Example
        </h1>
        
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            This page is rendered on the server with fresh data on every request
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Server rendered at: {new Date(timestamp).toLocaleString()}
          </p>
        </div>

        <SSRExample 
          initialData={apiData.data} 
          timestamp={timestamp}
        />

        <div className='mt-8'>
          <RenderingComparison />
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Key SSR Concepts:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold text-blue-700">cache: "no-store"</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Prevents caching and forces fresh data on every request
                </p>
              </div>
              
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold text-green-700">Server Component</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Runs on server, can access server-side resources directly
                </p>
              </div>
              
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h3 className="font-semibold text-purple-700">Fresh Data</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Always returns the most recent data from APIs/databases
                </p>
              </div>
              
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <h3 className="font-semibold text-orange-700">SEO Friendly</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Search engines see fully rendered HTML content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
