'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MiddlewareTestPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const addResult = (test: string, status: 'success' | 'error' | 'info', message: string, data?: any) => {
    setTestResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toLocaleTimeString() }])
  }

  const testLogging = async () => {
    try {
      const response = await fetch('/api/middleware-demo')
      const data = await response.json()
      addResult('Logging Middleware', 'success', 'Request logged successfully', data.requestInfo)
    } catch (error) {
      addResult('Logging Middleware', 'error', 'Failed to test logging', error)
    }
  }

  const testAuthentication = async () => {
    try {
      // Test without auth
      const response1 = await fetch('/api/protected')
      if (response1.status === 401) {
        addResult('Auth Middleware (No Token)', 'success', 'Correctly blocked unauthenticated request')
      }

      // Test with auth
      const response2 = await fetch('/api/protected', {
        headers: { 'Authorization': 'Bearer valid-token' }
      })
      const data = await response2.json()
      addResult('Auth Middleware (With Token)', 'success', 'Authenticated request passed', data.userInfo)
    } catch (error) {
      addResult('Auth Middleware', 'error', 'Failed to test authentication', error)
    }
  }

  const testRateLimit = async () => {
    try {
      const promises = Array.from({ length: 5 }, () => 
        fetch('/api/middleware-demo').then(r => r.json())
      )
      const results = await Promise.all(promises)
      addResult('Rate Limiting', 'info', `Made 5 rapid requests - check console for rate limit headers`)
    } catch (error) {
      addResult('Rate Limiting', 'error', 'Failed to test rate limiting', error)
    }
  }

  const testCORS = async () => {
    try {
      const response = await fetch('/api/middleware-demo', {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:3001',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      })
      addResult('CORS Middleware', 'success', 'CORS preflight request handled', { status: response.status })
    } catch (error) {
      addResult('CORS Middleware', 'error', 'Failed to test CORS', error)
    }
  }

  const testAdminAccess = async () => {
    try {
      const response = await fetch('/api/admin', {
        headers: { 'Authorization': 'Bearer valid-token' }
      })
      const data = await response.json()
      addResult('Admin Access', 'success', 'Admin endpoint accessed', data.adminInfo)
    } catch (error) {
      addResult('Admin Access', 'error', 'Failed to test admin access', error)
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  const runAllTests = async () => {
    setLoading(true)
    clearResults()
    
    await testLogging()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testAuthentication()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testRateLimit()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testCORS()
    await new Promise(resolve => setTimeout(resolve, 500))
    
    await testAdminAccess()
    
    setLoading(false)
  }

  useEffect(() => {
    addResult('Middleware Test Page', 'info', 'Page loaded - check browser console for detailed logs')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔧 Middleware Testing Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Test and observe the behavior of different middleware implementations in your Next.js application.
        </p>

        {/* Console Logs Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-blue-800 font-semibold mb-2">📝 Console Logs</h3>
          <p className="text-blue-700 text-sm">
            The detailed logs you see in the console are from our <strong>logging middleware</strong>. 
            They show: timestamp, method, URL, IP address, user-agent, and headers for each request.
          </p>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <button
              onClick={testLogging}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Logging
            </button>
            <button
              onClick={testAuthentication}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Auth
            </button>
            <button
              onClick={testRateLimit}
              disabled={loading}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Test Rate Limit
            </button>
            <button
              onClick={testCORS}
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Test CORS
            </button>
            <button
              onClick={testAdminAccess}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Test Admin
            </button>
            <button
              onClick={runAllTests}
              disabled={loading}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? 'Running...' : 'Run All Tests'}
            </button>
          </div>
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-500">No tests run yet. Click the buttons above to test middleware functionality.</p>
          ) : (
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.status === 'success' ? 'bg-green-50 border-green-200' :
                    result.status === 'error' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${
                      result.status === 'success' ? 'text-green-800' :
                      result.status === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {result.test}
                    </h3>
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                  </div>
                  <p className={`text-sm mb-2 ${
                    result.status === 'success' ? 'text-green-700' :
                    result.status === 'error' ? 'text-red-700' :
                    'text-blue-700'
                  }`}>
                    {result.message}
                  </p>
                  {result.data && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        View Response Data
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Middleware Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📚 Middleware Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Active Middlewares:</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>✅ Logging - Request/response logging</li>
                <li>✅ Security Headers - XSS, CSRF protection</li>
                <li>✅ CORS - Cross-origin resource sharing</li>
                <li>✅ Rate Limiting - Request throttling</li>
                <li>✅ Authentication - Token validation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What the Console Logs Show:</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>📝 Request timestamp and method</li>
                <li>🌐 Client IP address</li>
                <li>🔍 User-Agent information</li>
                <li>🔗 Referrer information</li>
                <li>📦 Complete request headers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Quick API Endpoints:</p>
          <div className="flex justify-center space-x-4 text-sm">
            <button
              onClick={() => window.open('/api/middleware-demo', '_blank')}
              className="text-blue-600 hover:underline"
            >
              /api/middleware-demo
            </button>
            <button
              onClick={() => window.open('/api/protected', '_blank')}
              className="text-blue-600 hover:underline"
            >
              /api/protected
            </button>
            <button
              onClick={() => window.open('/api/admin', '_blank')}
              className="text-blue-600 hover:underline"
            >
              /api/admin
            </button>
            <button
              onClick={() => window.open('/api/rate-limit-stats', '_blank')}
              className="text-blue-600 hover:underline"
            >
              /api/rate-limit-stats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
