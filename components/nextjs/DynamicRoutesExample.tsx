'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

export default function DynamicRoutesExample() {
  const [selectedExample, setSelectedExample] = useState('blog');

  const examples: Record<string, {
    path: string;
    url: string;
    code: string;
    usage: string;
  }> = {
    blog: {
      path: 'app/blog/[id]/page.jsx',
      url: '/blog/123',
      code: `export default function Page({ params }) {
  return <h1>Blog ID: {params.id}</h1>;
}`,
      usage: 'Blog posts, articles, news items'
    },
    product: {
      path: 'app/products/[slug]/page.jsx',
      url: '/products/laptop-pro',
      code: `export default function ProductPage({ params }) {
  return <h1>Product: {params.slug}</h1>;
}`,
      usage: 'E-commerce products, catalog items'
    },
    user: {
      path: 'app/users/[username]/page.jsx',
      url: '/users/johndoe',
      code: `export default function UserProfile({ params }) {
  return <h1>User Profile: {params.username}</h1>;
}`,
      usage: 'User profiles, social media pages'
    }
  };

  const currentExample = examples[selectedExample];

  return (
    <div className="border-2 border-green-500 p-4 rounded-lg max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Dynamic Routes Example</h3>
      
      <div className="bg-green-50 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">Dynamic Routes Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Flexible URLs:</strong> Create pages based on URL parameters</li>
          <li><strong>Bracket Notation:</strong> Use [param] in folder names</li>
          <li><strong>SEO Friendly:</strong> Clean, readable URLs for search engines</li>
          <li><strong>Scalable:</strong> Handle unlimited dynamic content</li>
          <li><strong>Type Safe:</strong> TypeScript support for params</li>
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Select Example:</h4>
        <div className="flex gap-2">
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`px-3 py-1 rounded text-sm capitalize transition-colors ${
                selectedExample === key
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">File Structure:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <code className="text-green-600">{currentExample.path}</code>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">URL Example:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <code className="text-green-600">{currentExample.url}</code>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Code Implementation:</h4>
        <div className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto">
          <pre>{currentExample.code}</pre>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Use Case:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <span className="text-green-700">{currentExample.usage}</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded text-sm">
        <p className="font-semibold text-yellow-800 flex items-center gap-2">
          <Lightbulb size={16} />
          Key Concept:
        </p>
        <p className="text-xs mt-1">
          Dynamic routes use bracket notation [param] to create flexible page structures. 
          The URL parameter is available in the params prop of your page component.
        </p>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        This demonstrates: dynamic routes, URL parameters, bracket notation
      </p>

      {/* <div className="mt-6 bg-red-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">💡 Interview Answer</h3>
        <p className="text-red-700 italic">
          "Dynamic routes allow pages to be generated based on URL parameters using bracket notation. 
          This enables creating flexible page structures like blog posts, product pages, and user profiles 
          where the URL contains variable segments that map to specific content."
        </p>
      </div> */}
    </div>
  );
}
