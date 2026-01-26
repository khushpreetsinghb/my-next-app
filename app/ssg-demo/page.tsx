import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Static Site Generation (SSG) Demo',
  description: 'Learn how SSG works with practical examples',
}
// 🔍 Interface for Metadata:
// No, you don't create an interface for metadata because
// Metadata is already imported from next/server. It's a built-in TypeScript type from Next.js.

// This is a Server Component that demonstrates SSG
// Default behavior = SSG (no cache option specified)

export default async function SSGPage() {
  // Fetch data at build time (default behavior = SSG)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts = await res.json()
  
  const buildTime = new Date().toISOString()

  // Cache Behavior:
  // SSG is the default behavior in Next.js. You don't need cache: "force-cache" because:

  // Default SSG Behavior:
  // This is automatically SSG (no cache option needed)
  // export default async function SSGPage() {
  //   const res = await fetch('https://api.example.com/posts')
  //   const posts = await res.json()
  //   return <Page posts={posts} />
  // }

  // When to Explicitly Force SSG:
  // Only needed if you want to be explicit or override other settings
  // const res = await fetch('https://api.example.com/posts', {
  //   cache: 'force-cache'
  // })
  
  // 📋 Cache Options Summary:
  // Option	Behavior	Use Case
  // No option	               SSG (default)	   Static content
  // cache: "force-cache"	     SSG (explicit)	   Force static
  // cache: "no-store"	       SSR	             Dynamic content
  // next: { revalidate: 60 }	 ISR	             Periodic updates
  
  // 🎯 Key Point:
  // SSG happens automatically when you:
  // Use fetch in a Server Component
  // Don't specify any cache option
  // Don't use dynamic functions that prevent caching

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Static Site Generation (SSG) Example
        </h1>
        
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            This page was rendered at build time and cached
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Build time: {new Date(buildTime).toLocaleString()}
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <strong>✅ SSG Active</strong> - Page generated at build time
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">How SSG Works:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h3 className="font-semibold text-green-700">✓ Page rendered at build time</h3>
                <p className="text-sm text-gray-700 mt-1">HTML is generated once during build</p>
              </div>
              
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold text-blue-700">✓ HTML is reused</h3>
                <p className="text-sm text-gray-700 mt-1">Same HTML served to all users</p>
              </div>
              
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h3 className="font-semibold text-purple-700">✓ Very fast</h3>
                <p className="text-sm text-gray-700 mt-1">No server processing needed</p>
              </div>
              
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <h3 className="font-semibold text-orange-700">✓ Best for SEO</h3>
                <p className="text-sm text-gray-700 mt-1">Search engines see complete HTML</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">When to Use SSG:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Content rarely changes</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Blogs and documentation</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Landing pages</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Marketing sites</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Portfolio sites</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>E-commerce product pages</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Sample Data (Static):</h2>
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
{`// Default behavior = SSG
export default async function Page() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return <Blog posts={posts} />;
}`}
            </pre> */}
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1">📌 Key Point:</h3>
              <p className="text-sm text-gray-700">
                If no dynamic data → Next.js makes it static automatically
              </p>
            </div>
            
            {/* <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-1">🎯 Interview Answer:</h3>
              <p className="text-sm italic text-gray-700">
                "SSG generates pages at build time, resulting in fast load times and excellent SEO."
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
