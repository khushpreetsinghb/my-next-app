'use client'

import { useState } from 'react'

// This would be in a separate file, but for demo purposes we'll include it here
export default function TagRevalidationDemo() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [revalidating, setRevalidating] = useState(false)
  const [lastFetch, setLastFetch] = useState<string>('')
  const [message, setMessage] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/tagged-data') // Remove tags - client fetch
      const result = await res.json()
      setData(result.data)
      setLastFetch(new Date().toLocaleString())
      setMessage('')
    } catch (error) {
      setMessage('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const revalidateData = async () => {
    setRevalidating(true)
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag: 'posts' }),
      })
      
      const result = await res.json()
      
      if (result.success) {
        setMessage(`✅ ${result.message}`)
        // Fetch fresh data after revalidation
        setTimeout(() => fetchData(), 500)
      } else {
        setMessage(`❌ ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to revalidate')
    } finally {
      setRevalidating(false)
    }
  }

  // 1. Fetch cached data
  // const res = await fetch('/api/tagged-data') // Gets cached posts

  // 2. Revalidate cache  
  // const res = await fetch('/api/revalidate', {
  //   method: 'POST',
  //   body: JSON.stringify({ tag: 'posts' })
  // }) // Triggers cache invalidation

  // 3. Fetch fresh data
  // const res = await fetch('/api/tagged-data') // Gets fresh posts

  // Initial Load: /api/tagged-data → Returns fresh data → Gets cached with "posts" tag
  // Subsequent Loads: /api/tagged-data → Returns cached data (fast)
  // Revalidate: /api/revalidate → Calls revalidateTag('posts') → Invalidates cache
  // Next Load: /api/tagged-data → Returns fresh data again → Gets re-cached
  
  // Route	           Method	      Purpose							    What it does
  // /api/tagged-data	 GET	       Data Provider					Returns data that gets cached
  // /api/revalidate	 POST	       Cache Invalidator			Triggers revalidation of cached data
  
  // We use BOTH routes in the demo page - one to get data, one to refresh the cache!

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tag-Based Revalidation Demo
        </h1>
        
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            Demonstrates on-demand revalidation using tags
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-lg">
            <strong>🏷️ Tag-Based Caching Active</strong>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">How Tag-Based Revalidation Works:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <h3 className="font-semibold text-orange-700">🏷️ Tag-based caching</h3>
                <p className="text-sm text-gray-700 mt-1">Group related data under tags</p>
              </div>
              
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold text-blue-700">🔄 On-demand revalidation</h3>
                <p className="text-sm text-gray-700 mt-1">Revalidate when needed</p>
              </div>
              
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold text-green-700">⚡ Instant updates</h3>
                <p className="text-sm text-gray-700 mt-1">No waiting for time-based</p>
              </div>
              
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h3 className="font-semibold text-purple-700">🎯 Precise control</h3>
                <p className="text-sm text-gray-700 mt-1">Revalidate specific data</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Code Example:</h2>
            <pre className="text-xs overflow-auto bg-gray-900 text-green-400 p-4 rounded">
{`// Tag-based caching
fetch(url, { next: { tags: ["posts"] } });

// On-demand revalidation
import { revalidateTag } from "next/cache";
revalidateTag("posts");`}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Interactive Demo:</h2>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Fetching...' : '📥 Fetch Data'}
              </button>
              
              <button
                onClick={revalidateData}
                disabled={revalidating}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
              >
                {revalidating ? 'Revalidating...' : '🔄 Revalidate "posts" Tag'}
              </button>
            </div>

            {message && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">{message}</p>
              </div>
            )}

            {data && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Last fetched:</strong> {lastFetch}
                </p>
                <pre className="text-xs overflow-auto bg-white p-3 rounded border">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">When to Use Tag-Based Revalidation:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>CMS content updates</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>E-commerce inventory changes</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>User-generated content</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>API webhook triggers</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Admin panel updates</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Real-time events</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1">⚠️ Important Architecture Note:</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Tag-based caching only works on server-side fetches!</strong>
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>❌ Client fetch: <code>fetch('/api/data', {`{ next: { tags: ['posts'] } }`})</code> → Tags ignored</p>
                <p>✅ Server fetch: <code>fetch('https://api.com/data', {`{ next: { tags: ['posts'] } }`})</code> → Tags work</p>
                <p>💡 Solution: Apply tags in API routes, not client components</p>
              </div>
            </div>

            {/* <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-1">🎯 Interview Answer:</h3>
              <p className="text-sm italic text-gray-700">
                "Next.js caching reduces server load and improves performance by reusing fetched data until it's revalidated."
                "Tag-based caching works only on server-side fetches. Client-side fetch ignores next.tags, so tags must be applied in API routes or Server Components."
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
