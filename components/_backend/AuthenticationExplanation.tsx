'use client';

import { useState } from 'react';

export default function AuthenticationExplanation() {
  const [activeTab, setActiveTab] = useState('concept');

  const tabs = [
    { id: 'concept', label: 'Concept', icon: '🧠' },
    { id: 'flow', label: 'Flow', icon: '🔄' },
    { id: 'libraries', label: 'Libraries', icon: '📚' },
    { id: 'implementation', label: 'Implementation', icon: '⚙️' },
    { id: 'interview', label: 'Interview', icon: '💼' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🔐 Authentication in Next.js</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          <div className="min-h-[500px] max-h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {activeTab === 'concept' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">🧠 What is Authentication?</h3>
                    <p className="text-blue-700">
                      <strong>Answering: "Who is this user?"</strong>
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      Authentication is the process of verifying the identity of a user or system.
                      It ensures that users are who they claim to be before granting access to resources.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">🧱 How Next.js handles auth (Conceptually)</h3>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-start">
                        <span className="mr-2">→</span>
                        <div>
                          <strong>Middleware:</strong> Protect routes
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">→</span>
                        <div>
                          <strong>Route handlers:</strong> Login / logout endpoints
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">→</span>
                        <div>
                          <strong>Cookies / sessions:</strong> Store auth state
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">→</span>
                        <div>
                          <strong>Server Components:</strong> Read user session
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-2">📦 Why auth is server-side in Next.js?</h3>
                    <ul className="space-y-1 text-purple-700">
                      <li>🔒 More secure</li>
                      <li>🛡️ No token leaks</li>
                      <li>🔍 Better SEO</li>
                      <li>⚡ Faster redirects</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'flow' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-3">🔄 Typical Auth Flow</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                          <strong>User logs in</strong>
                          <p className="text-sm text-orange-600">Submits credentials to login endpoint</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                          <strong>Backend sets session cookie</strong>
                          <p className="text-sm text-orange-600">Server creates secure session with HTTP-only cookie</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                          <strong>Middleware checks cookie</strong>
                          <p className="text-sm text-orange-600">Every request is validated at the edge</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                        <div>
                          <strong>If valid → allow access</strong>
                          <p className="text-sm text-orange-600">User can access protected routes</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                        <div>
                          <strong>If invalid → redirect to /login</strong>
                          <p className="text-sm text-orange-600">Unauthenticated users are redirected</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">📊 Flow Diagram</h3>
                    <div className="text-center space-y-2">
                      <div className="bg-blue-100 rounded px-3 py-2 inline-block">User → Login Page</div>
                      <div>↓</div>
                      <div className="bg-green-100 rounded px-3 py-2 inline-block">POST /api/auth/login</div>
                      <div>↓</div>
                      <div className="bg-purple-100 rounded px-3 py-2 inline-block">Set Session Cookie</div>
                      <div>↓</div>
                      <div className="bg-orange-100 rounded px-3 py-2 inline-block">Middleware Validation</div>
                      <div>↓</div>
                      <div className="bg-green-100 rounded px-3 py-2 inline-block">Access Protected Route</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'libraries' && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-800 mb-3">🧰 Popular Auth Libraries</h3>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-indigo-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-indigo-700">NextAuth.js</h4>
                            <p className="text-sm text-indigo-600">Most common, complete auth solution</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Popular</span>
                        </div>
                        <ul className="text-xs text-indigo-600 mt-2 space-y-1">
                          <li>• Multiple providers (Google, GitHub, etc.)</li>
                          <li>• Session management</li>
                          <li>• Built-in CSRF protection</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-indigo-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-indigo-700">Clerk</h4>
                            <p className="text-sm text-indigo-600">Modern, headless auth solution</p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Modern</span>
                        </div>
                        <ul className="text-xs text-indigo-600 mt-2 space-y-1">
                          <li>• Beautiful UI components</li>
                          <li>• Multi-factor authentication</li>
                          <li>• User management dashboard</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-indigo-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-indigo-700">Auth0</h4>
                            <p className="text-sm text-indigo-600">Enterprise-grade auth platform</p>
                          </div>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Enterprise</span>
                        </div>
                        <ul className="text-xs text-indigo-600 mt-2 space-y-1">
                          <li>• Advanced security features</li>
                          <li>• Scalable infrastructure</li>
                          <li>• Comprehensive analytics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'implementation' && (
                <div className="space-y-4">
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-800 mb-3">⚙️ Implementation Example</h3>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">Middleware (middleware.ts)</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">Route Handler (app/api/auth/login/route.ts)</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`export async function POST(request) {
  const { email, password } = await request.json()
  
  // Validate credentials
  const user = await validateUser(email, password)
  
  if (user) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth-token', user.token, {
      httpOnly: true,
      secure: true
    })
    return response
  }
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-medium text-cyan-700 mb-1">Server Component Reading Session</h4>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {`async function DashboardPage() {
  const token = cookies().get('auth-token')?.value
  const user = await getUserFromToken(token)
  
  if (!user) {
    redirect('/login')
  }
  
  return <h1>Welcome {user.name}!</h1>
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interview' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-3">💼 Interview Questions & Answers</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: How does authentication work in Next.js?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Authentication in Next.js is handled server-side using middleware and session-based libraries like NextAuth.
                            The middleware intercepts requests to protected routes, validates session cookies, and redirects unauthenticated users
                            to the login page. Route handlers handle login/logout operations, and server components can read user sessions directly."
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: Why is server-side auth better than client-side?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Server-side authentication is more secure because it prevents token leaks in client-side JavaScript,
                            eliminates exposure to XSS attacks, provides better SEO since protected content is rendered on the server, and enables
                            faster redirects at the edge/middleware level."
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-1">Q: What's the role of middleware in Next.js auth?</h4>
                        <div className="bg-white rounded p-3 border border-red-200">
                          <p className="text-sm text-red-600">
                            <strong>A:</strong> "Middleware acts as a gatekeeper that runs before rendering pages. It checks authentication status
                            by reading session cookies, validates tokens, and either allows access to protected routes or redirects users to login.
                            This provides security at the edge before requests reach your application code."
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-medium text-yellow-800 mb-1">🎯 Quick Answer Formula:</h4>
                        <p className="text-sm text-yellow-700 font-medium">
                          "Next.js auth = Middleware (protect) + Route Handlers (login/logout) + Sessions (store) + Server Components (read)"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
