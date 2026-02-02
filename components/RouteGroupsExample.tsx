'use client';

import { useState } from 'react';
import { Lightbulb, FolderOpen } from 'lucide-react';

export default function RouteGroupsExample() {
  const [selectedExample, setSelectedExample] = useState('auth');

  const examples: Record<string, {
    structure: string;
    url: string;
    description: string;
    files: string[];
    useCase: string;
  }> = {
    auth: {
      structure: 'app/(auth)/login/page.jsx',
      url: '/login',
      description: 'Authentication pages (login, register, forgot password)',
      files: ['login/page.jsx', 'register/page.jsx', 'forgot-password/page.jsx'],
      useCase: 'Group all auth-related pages together'
    },
    dashboard: {
      structure: 'app/(dashboard)/analytics/page.jsx',
      url: '/analytics',
      description: 'Dashboard and admin pages',
      files: ['analytics/page.jsx', 'users/page.jsx', 'settings/page.jsx'],
      useCase: 'Organize admin panel pages'
    },
    shop: {
      structure: 'app/(shop)/products/page.jsx',
      url: '/products',
      description: 'E-commerce and shopping pages',
      files: ['products/page.jsx', 'cart/page.jsx', 'checkout/page.jsx'],
      useCase: 'Group shopping-related pages'
    }
  };

  const currentExample = examples[selectedExample];

  return (
    <div className="border-2 border-purple-500 p-4 rounded-lg max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Route Groups Example</h3>
      
      <div className="bg-purple-50 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">Route Groups Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Organization:</strong> Group related pages together</li>
          <li><strong>Clean URLs:</strong> No folder name in the URL path</li>
          <li><strong>Shared Layouts:</strong> Apply layouts to specific groups</li>
          <li><strong>Colocation:</strong> Keep related files close together</li>
          <li><strong>Scalable:</strong> Easy to manage large applications</li>
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
                  ? 'bg-purple-500 text-white'
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
          <code className="text-purple-600">{currentExample.structure}</code>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Resulting URL:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <code className="text-purple-600">{currentExample.url}</code>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Description:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <span className="text-purple-700">{currentExample.description}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Example Files in Group:</h4>
        <div className="bg-gray-50 p-2 rounded">
          {currentExample.files.map((file: string, index: number) => (
            <div key={index} className="text-xs text-gray-600 mb-1">
              <code className="text-purple-600">app/({selectedExample})/{file}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Use Case:</h4>
        <div className="bg-gray-50 p-2 rounded text-sm">
          <span className="text-purple-700">{currentExample.useCase}</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded text-sm">
        <p className="font-semibold text-yellow-800 flex items-center gap-2">
          <Lightbulb size={16} />
          Key Concept:
        </p>
        <p className="text-xs mt-1">
          Route groups use parentheses (folder) to organize files without affecting the URL. 
          The folder name is ignored in the URL path, giving you clean URLs while maintaining organization.
        </p>
      </div>

      {/* <div className="mt-4 bg-blue-50 p-3 rounded text-sm">
        <p className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
          <FolderOpen size={16} />
          Folder Structure Example:
        </p>
        <div className="text-xs text-blue-700 font-mono">
          <div>app/</div>
          <div>├── (auth)/</div>
          <div>│   ├── login/</div>
          <div>│   │   └── page.jsx</div>
          <div>│   ├── register/</div>
          <div>│   │   └── page.jsx</div>
          <div>│   └── layout.jsx</div>
          <div>├── (dashboard)/</div>
          <div>│   ├── analytics/</div>
          <div>│   │   └── page.jsx</div>
          <div>│   └── layout.jsx</div>
          <div>└── page.jsx</div>
        </div>
      </div> */}

      <p className="mt-4 text-sm text-gray-600">
        This demonstrates: route groups, organization, clean URLs
      </p>
    </div>
  );
}
