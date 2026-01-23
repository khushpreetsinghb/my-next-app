// Server Component Example
// 
// This is a SERVER COMPONENT - it runs on the server by default
// Key characteristics:
// - NO "use client" directive
// - Runs on the server during render
// - Cannot use hooks (useState, useEffect, etc.)
// - Can access server-side resources (database, filesystem, APIs)
// - Faster initial load (no JavaScript shipped to client)
// - Better for SEO
// - Secure (can use environment variables, secrets)

import { Lightbulb } from "lucide-react";

// Simulating server-side data fetching
async function getServerData() {
  // This would typically be a database call or API call
  // For demo purposes, we'll simulate with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    timestamp: new Date().toISOString(),
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'development'
    },
    users: [
      { id: 1, name: "Alice", role: "Admin", lastLogin: "2025-01-22T10:30:00Z" },
      { id: 2, name: "Bob", role: "User", lastLogin: "2025-01-21T15:45:00Z" },
      { id: 3, name: "Charlie", role: "Moderator", lastLogin: "2025-01-23T09:15:00Z" }
    ]
  };
}

// Server Component - runs on server, no hooks needed
export default async function ServerComponentExample() {
  // Data fetching happens on the server
  const data = await getServerData();
  
  return (
    <div className="border-2 border-blue-500 p-4 rounded-lg mb-8 max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Server Component Example</h3>
      
      <div className="bg-blue-50 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">Server Component Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Runs on Server:</strong> Data fetching happens server-side</li>
          <li><strong>No JavaScript:</strong> No client-side JS needed for this content</li>
          <li><strong>Fast:</strong> Pre-rendered HTML sent to client</li>
          <li><strong>Secure:</strong> Can access secrets, databases, APIs safely</li>
          <li><strong>SEO Friendly:</strong> Content is available to search engines</li>
          <li><strong>No Hooks:</strong> Cannot use useState, useEffect, etc.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Server-Side Data:</h4>
        <div className="bg-gray-50 p-3 rounded text-sm">
          <p><strong>Generated at:</strong> {data.timestamp}</p>
          <p><strong>Node Version:</strong> {data.serverInfo.nodeVersion}</p>
          <p><strong>Platform:</strong> {data.serverInfo.platform}</p>
          <p><strong>Environment:</strong> {data.serverInfo.environment}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Users (Fetched on Server):</h4>
        <div className="space-y-2">
          {data.users.map(user => (
            <div key={user.id} className="bg-gray-50 p-2 rounded flex justify-between items-center">
              <div>
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(user.lastLogin).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded text-sm">
        <p className="font-semibold text-yellow-800 flex items-center gap-2">
          <Lightbulb size={16} />
          Key Difference:
        </p>
        <p className="text-xs mt-1">
          This component was rendered on the server and sent as HTML to your browser. 
          No JavaScript was needed to display this content. Try "View Source" - you'll see this data already in the HTML!
        </p>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: server components, server-side data fetching, no hooks
      </p>
    </div>
  );
}
