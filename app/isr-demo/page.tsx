import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Incremental Static Regeneration (ISR) Demo',
  description: 'Learn how ISR works with practical examples',
}

// This is a Server Component that demonstrates ISR
export default async function ISRPage() {
  // Fetch data with revalidation (ISR)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    next: { revalidate: 60 }, // revalidate every 60 seconds
  })
  const posts = await res.json()
  
  const generatedTime = new Date().toISOString()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Incremental Static Regeneration (ISR) Example
        </h1>
        
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            This page is static but revalidates every 60 seconds
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last generated: {new Date(generatedTime).toLocaleString()}
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
            <strong>🔄 ISR Active</strong> - Revalidates every 60s
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">How ISR Works:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h3 className="font-semibold text-purple-700">🔄 Hybrid of SSG + SSR</h3>
                <p className="text-sm text-gray-700 mt-1">Static page with periodic updates</p>
              </div>
              
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold text-blue-700">📄 Page is static</h3>
                <p className="text-sm text-gray-700 mt-1">Serves cached HTML initially</p>
              </div>
              
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold text-green-700">⏰ Rebuilds after given time</h3>
                <p className="text-sm text-gray-700 mt-1">Background regeneration</p>
              </div>
              
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <h3 className="font-semibold text-orange-700">🚀 Fast + Fresh</h3>
                <p className="text-sm text-gray-700 mt-1">Best of both worlds</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">When to Use ISR:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Data changes occasionally</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>News sites</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Product catalogs</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Dashboard stats</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>E-commerce listings</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                <span>API documentation</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Sample Data (Revalidates every 60s):</h2>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>💡 Tip:</strong> Refresh this page after 60 seconds to see updated data. 
                The first request after revalidation might show stale data while the page regenerates.
              </p>
            </div>
            <div className="space-y-4">
              {posts.map((post: any) => (
                <div key={post.id} className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Code Example:</h2>
            <pre className="text-xs overflow-auto bg-gray-900 text-green-400 p-4 rounded">
{`export default async function Page() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 }, // revalidate every 60s
  });
  const products = await res.json();

  return <Products products={products} />;
}`}
            </pre> */}
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1">⚡ ISR Flow:</h3>
              <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
                <li>First request: Generates static page</li>
                <li>Subsequent requests: Serve cached page (fast)</li>
                <li>After 60s: Background regeneration starts</li>
                <li>Next request: Gets fresh page</li>
              </ol>
            </div>
            
            {/* <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-1">🎯 Interview Answer:</h3>
              <p className="text-sm italic text-gray-700">
                "ISR allows static pages to be updated after deployment by revalidating them at runtime."
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

// All the fetch behaviors in our rendering demos. Let me show you how they map to what we've built:

// ✅ Already Covered:
// SSG (force-cache) - /ssg-demo
// Default behavior = force-cache (SSG)
// const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

// SSR (no-store) - /ssr-demo
// const res = await fetch('/api/ssr-demo', {
//   cache: 'no-store', // forces SSR
// })

// ISR (revalidate) - /isr-demo
// const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
//   next: { revalidate: 60 }, // revalidate every 60 seconds
// })

// 📋 Complete Coverage:
// Fetch Option	Rendering Method	Demo Page
// force-cache (default)	SSG	/ssg-demo ✅
// no-store	SSR	/ssr-demo ✅
// next: { revalidate: 60 }	ISR	/isr-demo ✅

// 🎯 Interview Answer Covered:
// "Next.js extends the native fetch API with built-in caching and revalidation capabilities."