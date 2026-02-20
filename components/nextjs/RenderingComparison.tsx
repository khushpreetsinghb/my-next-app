'use client'

import { useState } from 'react'

export default function RenderingComparison() {
  const [selectedMethod, setSelectedMethod] = useState('ssr')

  const methods = {
    ssr: {
      name: 'Server-Side Rendering (SSR)',
      description: 'Page rendered on every request',
      pros: [
        'Fresh data every time',
        'Great for SEO',
        'Fast initial load',
        'Works with auth/session'
      ],
      cons: [
        'Slower than cached versions',
        'Higher server load',
        'No client-side caching'
      ],
      useCase: 'Dynamic content, user dashboards, real-time data',
      code: `export default async function Page() {
  const res = await fetch("/api/data", {
    cache: "no-store", // forces SSR
  });
  const data = await res.json();
  return <Component data={data} />;
}`
    },
    ssg: {
      name: 'Static Site Generation (SSG)',
      description: 'Page rendered at build time',
      pros: [
        'Extremely fast',
        'Great for SEO',
        'Low server cost',
        'CDN friendly'
      ],
      cons: [
        'Stale content until rebuild',
        'Not for dynamic data',
        'Build time increases'
      ],
      useCase: 'Blogs, marketing pages, documentation',
      code: `export default async function Page() {
  const res = await fetch("/api/data", {
    cache: "force-cache", // forces SSG
  });
  const data = await res.json();
  return <Component data={data} />;
}`
    },
    isr: {
      name: 'Incremental Static Regeneration (ISR)',
      description: 'Static page with periodic revalidation',
      pros: [
        'Fast like SSG',
        'Fresh data periodically',
        'Good balance',
        'Background updates'
      ],
      cons: [
        'Not truly real-time',
        'Stale data between updates',
        'Complex revalidation logic'
      ],
      useCase: 'E-commerce product pages, news sites',
      code: `export default async function Page() {
  const res = await fetch("/api/data", {
    next: { revalidate: 60 }, // revalidate every 60s
  });
  const data = await res.json();
  return <Component data={data} />;
}`
    },
    csr: {
      name: 'Client-Side Rendering (CSR)',
      description: 'Page rendered in browser',
      pros: [
        'Rich interactions',
        'Fast after initial load',
        'Offline capable',
        'Great for SPAs'
      ],
      cons: [
        'Poor SEO',
        'Slower initial load',
        'Loading states needed',
        'JavaScript required'
      ],
      useCase: 'Admin dashboards, web applications',
      code: `function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return data ? <Component data={data} /> : <Loading />;
}`
    }
  }

  const currentMethod = methods[selectedMethod as keyof typeof methods]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Rendering Methods Comparison
      </h2>

      {/* Method Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {Object.entries(methods).map(([key, method]) => (
          <button
            key={key}
            onClick={() => setSelectedMethod(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
              selectedMethod === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Current Method Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {currentMethod.name}
          </h3>
          <p className="text-gray-600 mb-4">{currentMethod.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-green-600 mb-2">✅ Pros:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {currentMethod.pros.map((pro, index) => (
                <li key={index} className="text-gray-700">{pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-red-600 mb-2">❌ Cons:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {currentMethod.cons.map((con, index) => (
                <li key={index} className="text-gray-700">{con}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-1">Best For:</h4>
            <p className="text-sm text-gray-700">{currentMethod.useCase}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Code Example:</h4>
          <pre className="text-xs overflow-auto bg-gray-900 text-green-400 p-4 rounded-lg">
            {currentMethod.code}
          </pre>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Comparison</h3>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">Method</th>
              <th className="border border-gray-300 px-3 py-2 text-left">When Rendered</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Data Freshness</th>
              <th className="border border-gray-300 px-3 py-2 text-left">SEO</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">SSR</td>
              <td className="border border-gray-300 px-3 py-2">Every request</td>
              <td className="border border-gray-300 px-3 py-2">Always fresh</td>
              <td className="border border-gray-300 px-3 py-2">Excellent</td>
              <td className="border border-gray-300 px-3 py-2">Good</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">SSG</td>
              <td className="border border-gray-300 px-3 py-2">Build time</td>
              <td className="border border-gray-300 px-3 py-2">Stale</td>
              <td className="border border-gray-300 px-3 py-2">Excellent</td>
              <td className="border border-gray-300 px-3 py-2">Excellent</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">ISR</td>
              <td className="border border-gray-300 px-3 py-2">Periodic</td>
              <td className="border border-gray-300 px-3 py-2">Fresh-ish</td>
              <td className="border border-gray-300 px-3 py-2">Excellent</td>
              <td className="border border-gray-300 px-3 py-2">Very Good</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">CSR</td>
              <td className="border border-gray-300 px-3 py-2">Browser</td>
              <td className="border border-gray-300 px-3 py-2">Fresh</td>
              <td className="border border-gray-300 px-3 py-2">Poor</td>
              <td className="border border-gray-300 px-3 py-2">Fair</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
