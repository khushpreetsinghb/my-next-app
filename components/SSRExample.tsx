'use client'

import { useState } from 'react'

interface SSRDemoProps {
  initialData: any
  timestamp: string
}

export default function SSRDemo({ initialData, timestamp }: SSRDemoProps) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(timestamp)

  const refreshData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ssr-demo', { cache: 'no-store' })
      const freshData = await res.json()
      setData(freshData.data)
      setLastRefresh(freshData.timestamp)
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Server-Side Rendering (SSR) Demo</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">How SSR Works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Page rendered on <strong>every request</strong></li>
          <li>Runs on the <strong>server</strong></li>
          <li><strong>Fresh data</strong> every time</li>
          <li>Perfect for dynamic/authenticated content</li>
        </ul>
      </div>

      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2">When to Use SSR:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Data changes frequently</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Needs authentication/session</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Personalized content</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Real-time information</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Live Data (Updated on each refresh):</h3>
          <button
            onClick={refreshData}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Last Server Render:</strong> {new Date(lastRefresh).toLocaleString()}
          </p>
          <pre className="text-xs overflow-auto bg-white p-3 rounded border">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>

      {/* <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">Code Example:</h3>
        <pre className="text-xs overflow-auto bg-gray-900 text-green-400 p-3 rounded">
{`// Server Component (SSR)
export default async function Page() {
  const res = await fetch("https://api.example.com/users", {
    cache: "no-store", // forces SSR
  });
  const data = await res.json();

  return <Component data={data} />;
}`}
        </pre>
      </div>

      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2">🎯 Interview Answer:</h3>
        <p className="text-sm italic">
          "SSR renders the page on every request, ensuring fresh data and better SEO compared to client-side rendering. It's ideal for dynamic content that changes frequently or requires authentication."
        </p>
      </div> */}
    </div>
  )
}
